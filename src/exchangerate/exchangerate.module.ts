import { Module } from '@nestjs/common';
import { ExchangerateService } from './exchangerate.service';
import { ExchangerateController } from './exchangerate.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [ExchangerateService, PrismaService, ConfigService],
  controllers: [ExchangerateController],
})
export class ExchangerateModule {}
