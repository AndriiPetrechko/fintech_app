import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { CryptoCurrency, Currency, FiatCurrency, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateResponseDto } from 'src/util/dto.entites';

@Injectable()
export class ExchangeService {
  constructor(private prisma: PrismaService) {}

  public async getCryptoAllAssetsRates(
    crypto_symbol: string,
  ): Promise<RateResponseDto[]> {
    if (
      !Object.values(CryptoCurrency).includes(crypto_symbol as CryptoCurrency)
    ) {
      throw new HttpException('Invalid crypto symbol', HttpStatus.BAD_REQUEST);
    }
    const assets = Object.keys(FiatCurrency).map((key) => {
      return crypto_symbol.concat('/', FiatCurrency[key]);
    });
    const res = await this.prisma.currency.findMany({
      where: { pair: { in: assets } },
    });
    return res.map((item) => {
      return _.omit(item, ['id', 'createdAt']);
    });
  }

  public async getCryptoAssetRate(
    input_pair: string,
  ): Promise<RateResponseDto[]> {
    const pairsArray = input_pair.split(', ');
    const res = await this.prisma.currency.findMany({
      where: { pair: { in: pairsArray } },
    });
    return res.map((item) => {
      return _.omit(item, ['id', 'createdAt']);
    });
  }

  public async findCurrencyByPair(findPair: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({ where: { pair: findPair } });
  }

  public async createCurrency(
    data: Prisma.CurrencyCreateInput,
  ): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  public async updateCurrency(
    data: Prisma.CurrencyCreateInput,
  ): Promise<Currency> {
    return this.prisma.currency.update({
      where: {
        pair: data.pair,
      },
      data: {
        value: data.value,
      },
    });
  }
}
