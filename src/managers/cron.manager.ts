import * as _ from 'lodash';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import Bull, { JobOptions, Queue } from 'bull';
import { generateCronJobId } from 'src/util/generator.helper';
import { RedisManager } from './redis.manager';
import { QUEUE_NAME } from 'src/util/constant';

const CRON_JOB_ID_LENGTH = 7;

@Injectable()
export class CronManager {
  private readonly logger = new Logger(CronManager.name);
  constructor(
    @InjectQueue(QUEUE_NAME) private cronQueue: Queue,
    private redisManager: RedisManager,
  ) {}

  public async removeAllCron(): Promise<void> {
    return this.cronQueue.empty();
  }

  public async removeCron(repeatableKey: string): Promise<void> {
    return this.cronQueue.removeRepeatableByKey(repeatableKey);
  }

  public async getRepeatableCron(): Promise<Bull.JobInformation[]> {
    return this.cronQueue.getRepeatableJobs();
  }

  public async createCron(jobName: string, data: any): Promise<string> {
    // check if midnightCron was already created
    const createdCron = await this.getRepeatableCron();
    const isMidnightCron = createdCron.find((cron) => cron.name === jobName);
    if (isMidnightCron) {
      this.logger.log(
        `${jobName} was already created and running successfully`,
      );
      return;
    }

    this.logger.log(`Create ${jobName}`);
    const options: JobOptions = {
      repeat: { cron: '0 0 * * *' },
      jobId: generateCronJobId(CRON_JOB_ID_LENGTH),
    };
    const job: Bull.Job = await this.cronQueue.add(jobName, data, options);
    if (!_.get(job, 'opts.repeat.key')) {
      return null;
    }
    console.log(job);
    return (job.opts.repeat as any).key;
  }
}
