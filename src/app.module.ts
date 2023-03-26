import { Module, OnApplicationShutdown, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { KrakenManager } from './managers/kraken.manager';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ExchangeService } from './exchange/exchange.service';
import { ExchangeModule } from './exchange/exchange.module';
import { configValidationSchema } from './util/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: configValidationSchema,
    }),
    UserModule,
    PrismaModule,
    ExchangeModule,
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService,
    KrakenManager,
    PrismaService,
    ExchangeService,
  ],
})
export class AppModule implements OnApplicationShutdown {
  private readonly logger = new Logger(AppModule.name);

  onApplicationShutdown() {
    this.logger.log('Nest application shutdown');
  }
}
