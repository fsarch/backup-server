import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupJobService } from './backup-job.service.js';
import { BackupJob } from '../../database/entities/backup-job.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([BackupJob])],
  providers: [BackupJobService],
  exports: [BackupJobService],
})
export class BackupJobModule {}

