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
        headers: {
          'Authorization': 'Basic c2l0ZTo4Z1c2bFhCVTRYeGlnMg=='
        }
      }
    )

    return JSON.stringify(res)
  }
}
