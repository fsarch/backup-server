import { Module } from '@nestjs/common';
import { ConnectorModule } from './connector/connector.module.js';
import { StorageModule } from './storage/storage.module.js';
import { BackupJobModule } from './backup-job/backup-job.module.js';
import { BackupModule } from './backup/backup.module.js';
import { ConnectorServiceModule } from './connector-service/connector-service.module.js';

@Module({
  imports: [ConnectorModule, StorageModule, BackupJobModule, BackupModule, ConnectorServiceModule],
  exports: [ConnectorModule, StorageModule, BackupJobModule, BackupModule],
})
export class RepositoriesModule {}
