import axios from 'axios'
import _ from 'lodash'

import storage from '../../units/storage'
import { deductBonus, getAvailableBonuses } from '../bonuses'
import {
  ParselCreateRequestTypeFE,
  ParselCreateRequestTypeBE,
  ParselCreateResponseType,
  OrderType,
  ParselCreateResponseTypeBE,
  ParselCreateResponseErrorType
} from '../../types/boxberry.type'
import useLastOrderId, { incrementLastOrderId } from '../../hooks/useLastOrderId'
import { UserType } from '../../types/user.type'

// DEVELOPMENT FLAG: Set to false before pushing to production
const DEV_ALLOW_ORDER_CREATION = true; // <-- SET TO FALSE IN PRODUCTION

const parselCreate = async (
  props: ParselCreateRequestTypeFE & { useBonuses?: boolean }
): Promise<ParselCreateResponseTypeBE> => {
  if (!DEV_ALLOW_ORDER_CREATION) {
    throw new Error('Order creation is disabled in production.');
  }
  await incrementLastOrderId()
  const last_order_id = await useLastOrderId()
  const order_id = '' + last_order_id
  const parselCreatePropsBE = {
    ...props,
    items: props.items.map(item => ({
      id: item.id,
      name: item.name,
      UnitName: "шт.",
      // nds: string
      price: item.price,
      quantity: item.quantity,
      // marking_crpt: Маркировка товара ЦРПТ
    })),
    order_id
  }

  try {
    const parcel = (await axios.post<ParselCreateResponseType | ParselCreateResponseErrorType>(
      'https://api.boxberry.ru/json.php',
      createParselCreateRequest(parselCreatePropsBE)
    )).data

    if ((parcel as ParselCreateResponseErrorType).err)
      throw new Error((parcel as ParselCreateResponseErrorType).err)
    
    const timestamp = (new Date()).getTime()
    const { promocode } = props
    // Deduct bonuses if requested
    let bonusesUsed = 0
    if (props.useBonuses && props.email) {
      let user: UserType | undefined = undefined;
      if (props.email) {
        user = await storage.get<UserType>('users.json', { email: props.email });
        if (user) {
          // 1. Add perpetual bonus equal to total quantity
          const totalQuantity = props.items.reduce((sum, item) => sum + (item.quantity || 0), 0);
          if (totalQuantity > 0) {
            const { addBonus } = await import('../bonuses');
            user = addBonus(user, totalQuantity, 'perpetual', 'Бонус за количество товаров в заказе');
          }

          // 2. First 10 buyers of 6028
          if (order_id.startsWith('6028')) {
            const allOrders = storage.read<any[]>('orders.json') || [];
            const buyers6028 = allOrders.filter(o => o.order_id && o.order_id.startsWith('6028')).map(o => o.email);
            const uniqueBuyers = Array.from(new Set(buyers6028));
            if (uniqueBuyers.length < 10 && !uniqueBuyers.includes(user.email)) {
              const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;
              const { addBonus } = await import('../bonuses');
              user = addBonus(user, 5000, 'urgent', 'Бонус первым 10 покупателям 6028', Date.now() + sixMonths);
            }
          }

          // 3. Birthday bonus (±15 days, once per year)
          if (user.birthdate) {
            const now = new Date();
            const birth = new Date(user.birthdate);
            birth.setFullYear(now.getFullYear());
            const diffDays = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
            if (Math.abs(diffDays) <= 15) {
              // Check if already received this year
              const alreadyGot = (user.bonuses || []).some(b => b.reason === 'Бонус ко дню рождения' && new Date(b.issuedAt).getFullYear() === now.getFullYear());
              if (!alreadyGot) {
                const thirtyDays = 1000 * 60 * 60 * 24 * 30;
                const { addBonus } = await import('../bonuses');
                user = addBonus(user, 3000, 'urgent', 'Бонус ко дню рождения', Date.now() + thirtyDays);
              }
            }
          }
          await storage.update('users.json', user);
        }
      }
    }
    await storage.push('orders.json', {
      order_id,
      timestamp,
      ...props,
      items: props.items.map(item => _.omit(item, ['description', 'sizes', 'categories', 'images'])),
      parcel,
      promocode,
      bonusesUsed
    } as OrderType)

    return ({
      parcel: parcel as ParselCreateResponseType,
      order_id,
      timestamp,
      price: props.price,
      items: props.items
    })
  } catch (err) {
    throw new Error(err)
  }
}


export default parselCreate


const {
  BOXBERRY_API_TOKEN,
  BOXBERRY_TARGET_START
} = process.env


const createParselCreateRequest = (props: ParselCreateRequestTypeBE) => {
  const kurdost = !props.pvz_number

  return ({
    "token": BOXBERRY_API_TOKEN,
    "method": "ParselCreate",
    "sdata": {
      "partner_token": "",
      "updateByTrack": "",
      "order_id": props.order_id,
      "PalletNumber": "",
      "barcode": "",
      "price": props.price,
      "payment_sum": props.payment_sum,
      "delivery_sum": props.delivery_sum,
      "vid": kurdost ? 2 : 1,
      "issue": "1",
      "kurdost": kurdost ?
        {
          "index": props.zip || "",
          "citi": props.city || "",
          "addressp": props.address || "",
          "delivery_date": "",
          "timesfrom1": "",
          "timesto1": "",
          "comentk": ""
        }
        :
        {
          "index": "",
          "citi": "",
          "addressp": "",
          "delivery_date": "",
          "timesfrom1": "",
          "timesto1": "",
          "comentk": ""
        }
      ,
      "export":
      {
        "index": "",
        "countryСode": "",
        "cityCode": "",
        "area": "",
        "street": "",
        "house": "",
        "flat": "",
        "transporterGuid": ""
      },
      "shop":
      {
        "name": kurdost ? "" : props.pvz_number,
        "name1": BOXBERRY_TARGET_START
      },
      "customer":
      {
        "fio": props.fio,
        "phone": props.phone,
        // "phone2": props.phone2,
        "email": props.email,
      },
      "items": props.items,
      "notice": "",
      "weights":
      {
        "weight": "2000",
        "barcode": "",
        "x": "30",
        "y": "20",
        "z": "20",
        // "weight2": "1500",
        // "barcode2": "",
        // "x2": "10",
        // "y2": "15",
        // "z2": "10"
      }
    }
  })
}
