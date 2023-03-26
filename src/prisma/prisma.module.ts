import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeService } from 'src/exchange/exchange.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [ConfigService, PrismaService, ExchangeService],
})
export class PrismaModule {}
