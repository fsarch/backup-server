import { Module } from '@nestjs/common';
import { FileService } from './file.service.js';

@Module({
  providers: [FileService]
})
export class FileModule {}
