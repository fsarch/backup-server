import { Module } from '@nestjs/common';
import { StoragesController } from './storages.controller.js';
import { StorageModule } from '../../repositories/storage/storage.module.js';

@Module({
  imports: [StorageModule],
  controllers: [StoragesController],
})
export class StoragesModule {}

