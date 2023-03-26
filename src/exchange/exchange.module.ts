import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService, PrismaService, ConfigService],
})
export class ExchangeModule {}
