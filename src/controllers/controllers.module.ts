import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module.js';
import { StoragesModule } from './storages/storages.module.js';
import { BackupJobsModule } from './backup-jobs/backup-jobs.module.js';

@Module({
  imports: [ConnectorsModule, StoragesModule, BackupJobsModule],
})
export class ControllersModule {}
