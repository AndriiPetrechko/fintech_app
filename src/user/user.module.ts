import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExchangeService } from 'src/exchange/exchange.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, ConfigService, ExchangeService],
})
export class UserModule {}
