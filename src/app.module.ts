import { Module, OnApplicationShutdown, Logger } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { KrakenManager } from './managers/kraken.manager';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { ExchangerateModule } from './exchangerate/exchangerate.module';
import { ExchangerateService } from './exchangerate/exchangerate.service';

@Module({
  imports: [UserModule, PrismaModule, ExchangerateModule],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService,
    KrakenManager,
    PrismaService,
    ExchangerateService,
  ],
})
export class AppModule implements OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onApplicationShutdown() {
    this.logger.log('Nest application shutdown');
  }
}
