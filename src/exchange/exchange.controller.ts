import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { formatResponse } from 'src/util/util';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  // Get all current rates for base crypto currency
  @Get('get_currency')
  async getCurrency(@Query('crypto_symbol') crypto_symbol: string) {
    return formatResponse(
      await this.exchangeService.getCryptoAllAssetsRates(crypto_symbol),
      HttpStatus.OK,
      'The operation is successful',
    );
  }

  // Get specific rate for pair
  @Get('get_rate')
  async getExchengeRate(@Query('pair') pair: string) {
    return formatResponse(
      await this.exchangeService.getCryptoAssetRate(pair),
      HttpStatus.OK,
      'The operation is successful',
    );
  }
}
