import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

import { ProductsService } from './products.service';
import { ColorPriceSizeType, getProductsResponce, ParsedProductType, ProductType } from './products.type';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<ParsedProductType[]> {
    try {
      const { items: items_from_1C } = (await axios.get<getProductsResponce>(
        'https://1c.yoot.pro:4443/trade3/hs/catalog/products',
        {
          auth: {
            username: 'site',
            password: '8gW6lXBU4Xxig2'
          }
        }
      )).data
      const items_from_1C_parsed_map = new Map<string, ParsedProductType>()

      items_from_1C.forEach(item => {
        const itemName = getItemName(item)
        let item_in_map = items_from_1C_parsed_map.get(itemName)
        const color_price_size: ColorPriceSizeType = {
          color: item.color,
          price: item.price,
          size: item.size,
          max_available: item.count,
        }

        if (!item_in_map)
          item_in_map = {
            name: itemName,
            color_price_size: []
          }

        items_from_1C_parsed_map.set(itemName, {
          ...item_in_map,
          color_price_size: [...item_in_map.color_price_size, color_price_size]
        })
      })

      return [...items_from_1C_parsed_map].map(([_name, value]) => value)

    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

const getItemName = (item: ProductType) => {
  const number_of_spaces = (item.color.match(/ /g) || []).length + ((item.size + '').match(/ /g) || []).length + 2

  return item.name.split(' ').slice(0, -number_of_spaces).join(' ')
}
