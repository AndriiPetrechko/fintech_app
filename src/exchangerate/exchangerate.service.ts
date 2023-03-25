import { Injectable } from '@nestjs/common';
import { Currency, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ExchangerateService {
  constructor(private prisma: PrismaService) {}

  public async findCurrencyByPair(findPair: string): Promise<Currency | null> {
    return this.prisma.currency.findUnique({ where: { pair: findPair } });
  }

  async createCurrency(data: Prisma.CurrencyCreateInput): Promise<Currency> {
    return this.prisma.currency.create({
      data,
    });
  }

  async updateCurrency(data: Prisma.CurrencyCreateInput): Promise<Currency> {
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
