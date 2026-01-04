import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupService } from './backup.service.js';
import { FileModule } from './file/file.module.js';
import { Backup } from '../../database/entities/backup.entity.js';
import { ConnectorServiceModule } from "../connector-service/connector-service.module.js";
import { ConnectorModule } from "../connector/connector.module.js";

@Module({
  imports: [FileModule, TypeOrmModule.forFeature([Backup]), ConnectorServiceModule, ConnectorModule],
  providers: [BackupService],
  exports: [BackupService],
})
export class BackupModule {}
