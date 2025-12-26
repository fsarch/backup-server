import { Module } from '@nestjs/common';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { ControllersModule } from './controllers/controllers.module.js';
import { RepositoriesModule } from './repositories/repositories.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BaseTables1766748137677 } from "./database/migrations/1766748137677-base-tables.js";

// static imports for entities
import { Storage } from './database/entities/storage.entity.js';
import { LocalStorage } from './database/entities/local-storage.entity.js';
import { Connector } from './database/entities/connector.entity.js';
import { ConnectorService } from './database/entities/connector-service.entity.js';
import { BackupJob } from './database/entities/backup-job.entity.js';
import { Backup } from './database/entities/backup.entity.js';
import { FileEntity } from './database/entities/file.entity.js';
import { BackupFile } from './database/entities/backup-file.entity.js';

@Module({
  imports: [
    FsarchModule.register({
      auth: {},
      database: {
        entities: [
          Storage,
          LocalStorage,
          Connector,
          ConnectorService,
          BackupJob,
          Backup,
          FileEntity,
          BackupFile,
        ],
        migrations: [
          BaseTables1766748137677,
        ],
      },
    }),
    EventEmitterModule.forRoot(),
    ControllersModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
