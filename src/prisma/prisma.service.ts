import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prismaOptions: Prisma.PrismaClientOptions = {
  log: [{ emit: 'event', level: 'query' }],
};

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'query'>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super(prismaOptions);
  }

  async onModuleInit() {
    await this.$connect();
    this.$on('error', (_e) => {
      this.logger.error(_e);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
