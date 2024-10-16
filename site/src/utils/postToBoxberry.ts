import axios from 'axios'

import isProd from './isProd'


const postURL = isProd() ?
  'https://hyperdao.xyz/maytry/post-boxberry'
  :
  'http://localhost:5010/post-boxberry'

const postToBoxberry = async (props: createDataProps) => {
  const res = await axios.post(
    postURL,
    createData(props)
  )
  console.log(res)
}


export default postToBoxberry

export type createDataProps = {
  order_id: string

  price: number
  payment_sum: number
  delivery_sum: number

  pvz_number: string

  fio: string
  phone: string
  email: string

  items: BoxberryItemType[]
}

export type BoxberryItemType = {
  id: string
  name: string
  UnitName: string // "шт."
  nds: string // ""
  price: string
  quantity: string
  marking_crpt: string // ""
}

const createData = (props: createDataProps) => ({
  "token": import.meta.env.VITE_BOXBERRY_API_TOKEN,
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
    "vid": "1",
    "issue": "1",
    "kurdost":
    {
      "index": "",
      "citi": "",
      "addressp": "",
      "delivery_date": "",
      "timesfrom1": "",
      "timesto1": "",
      "comentk": ""
    },
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
      "name": props.pvz_number,
      "name1": '01010'
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
      "weight": "3000",
      "barcode": "",
      "x": "20",
      "y": "20",
      "z": "10",
      "weight2": "1500",
      "barcode2": "",
      "x2": "10",
      "y2": "15",
      "z2": "10"
    }
  }
})
