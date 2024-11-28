import axios from 'axios'
import _ from 'lodash'

import storage from '../storage'
import {
  ParselCreateRequestTypeFE,
  ParselCreateRequestTypeBE,
  ParselCreateResponceType,
  ParselCreateErrorType,
  OrderType
} from '../../types/boxberry.type'


const { BOXBERRY_INITIAL_ORDER_ID } = process.env


const parselCreate = async (props: ParselCreateRequestTypeFE) => {
  let orders = storage.read('boxberry-order-id.json') as { last_order_id: number } | undefined
  let last_order_id: string | number | undefined

  if (!orders) {
    last_order_id = parseInt(BOXBERRY_INITIAL_ORDER_ID)
  } else {
    last_order_id = parseInt(orders.last_order_id + '') + 1
  }
  orders = { last_order_id }
  storage.write('boxberry-order-id.json', orders)
  
  // const order_id = 'lev-order-' + last_order_id
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
    const parcel = (await axios.post<ParselCreateResponceType | ParselCreateErrorType>(
      'https://api.boxberry.ru/json.php',
      createParselCreateRequest(parselCreatePropsBE)
    )).data

    storage.push('orders.json', {
      order_id,
      timestamp: (new Date()).getTime(),
      ...props,
      items: props.items.map(item => _.omit(item, ['description', 'sizes', 'categories', 'images'])),
      parcel
    } as OrderType)

    return parcel
  } catch (err) {
    console.log('parselCreate() error')
    console.log(err)
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
