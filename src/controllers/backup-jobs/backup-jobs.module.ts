import { Module } from '@nestjs/common';
import { BackupJobsController } from './backup-jobs.controller.js';
import { BackupJobModule } from '../../repositories/backup-job/backup-job.module.js';

@Module({
  imports: [BackupJobModule],
  controllers: [BackupJobsController],
})
export class BackupJobsModule {}

