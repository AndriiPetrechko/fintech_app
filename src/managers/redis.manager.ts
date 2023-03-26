import { Logger } from '@nestjs/common';
import { createClient } from 'redis';

export class RedisManager {
  private readonly logger = new Logger(RedisManager.name);
  client = createClient({
    url: process.env.REDIS_URL,
  });
  constructor() {
    this.client.on('error', (err) => console.log('Redis Client Error', err));
    this.client.on('connect', () => {
      this.logger.log('Connect to redis success');
    });
  }

  async connectRedis() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.disconnect();
    this.logger.log('Disconnect from redis');
  }
}
