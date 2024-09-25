import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';
import axios from 'axios';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<any> {
    try {
      const res: any = await axios.get(
        'https://1c.yoot.pro:4443/trade3/hs/catalog/products',
        {
          auth: {
            username: 'site',
            password: '8gW6lXBU4Xxig2'
          }
        }
      )
  
      return res.data
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
