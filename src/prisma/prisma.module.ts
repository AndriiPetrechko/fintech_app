import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangerateService } from 'src/exchangerate/exchangerate.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [ConfigService, PrismaService, ExchangerateService],
})
export class PrismaModule {}
