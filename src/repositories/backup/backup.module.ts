import { Module } from '@nestjs/common';
import { BackupService } from './backup.service.js';
import { FileModule } from './file/file.module.js';

@Module({
  providers: [BackupService],
  imports: [FileModule],
  exports: [BackupService],
})
export class BackupModule {}
