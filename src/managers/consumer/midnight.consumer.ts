import {
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { QUEUE_NAME, CRON_NAME } from '../../util/constant';

@Processor(QUEUE_NAME)
export class MidnightConsumer {
  private readonly logger = new Logger(CRON_NAME);

  constructor(private userService: UserService) {}

  @Process(CRON_NAME)
  async process(): Promise<void> {
    await this.userService.midnightUpdateUsersBalance();
    return;
  }

  @OnQueueCompleted({ name: CRON_NAME })
  onCompleted(): void {
    this.logger.log(
      `The operation is successful! Calculate and store the balance of each specific account in the reference currency according to the latest exchange rate`,
    );
  }

  @OnQueueFailed({ name: CRON_NAME })
  onFailed(): void {
    this.logger.error(`MidnightCron was failed`);
  }
}
