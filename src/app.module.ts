import {
  Module,
  OnApplicationShutdown,
  Logger,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
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
import { RedisManager } from './managers/redis.manager';
import { CronManager } from './managers/cron.manager';
import { MidnightConsumer } from './managers/consumer/midnight.consumer';
import { CRON_NAME, QUEUE_NAME } from './util/constant';

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
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
  ],
  controllers: [UserController],
  providers: [
    ConfigService,
    UserService,
    KrakenManager,
    PrismaService,
    ExchangeService,
    RedisManager,
    CronManager,
    MidnightConsumer,
  ],
})
export class AppModule
  implements OnApplicationShutdown, OnApplicationBootstrap
{
  private readonly logger = new Logger(AppModule.name);
  constructor(
    private cronManager: CronManager,
    private redisManager: RedisManager,
    private krakenManager: KrakenManager,
  ) {}

  async onApplicationShutdown(): Promise<void> {
    await this.redisManager.disconnect();
    this.krakenManager.closeConnection();
    this.logger.log('Nest application shutdown');
  }
  async onApplicationBootstrap(): Promise<void> {
    await this.redisManager.connectRedis();
    await this.cronManager.createCron(CRON_NAME, {});
  }
}
