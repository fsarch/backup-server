import { Module } from '@nestjs/common';
import { ConnectorModule } from './connector/connector.module.js';
import { StorageModule } from './storage/storage.module.js';
import { BackupJobModule } from './backup-job/backup-job.module.js';

@Module({
  imports: [ConnectorModule, StorageModule, BackupJobModule],
  exports: [ConnectorModule, StorageModule, BackupJobModule],
})
export class RepositoriesModule {}
