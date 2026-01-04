import { Module } from '@nestjs/common';
import { BackupsController } from './backups.controller.js';
import { FilesModule } from './files/files.module.js';
import { BackupModule } from "../../repositories/backup/backup.module.js";

@Module({
  controllers: [BackupsController],
  providers: [],
  imports: [FilesModule, BackupModule]
})
export class BackupsModule {}
