import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import axios from 'axios';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<string> {
    const res = await axios.get(
      'https://1c.yoot.pro:4443/trade3/hs/catalog/products',
      {
        auth: {
          username: 'site',
          password: '8gW6lXBU4Xxig2'
        }
      }
    )

    return JSON.stringify(res)
  }
}
