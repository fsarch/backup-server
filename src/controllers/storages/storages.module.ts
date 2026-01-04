import { Module } from '@nestjs/common';
import { StoragesController } from './storages.controller.js';
import { StorageModule } from '../../repositories/storage/storage.module.js';
import { ModuleConfiguration } from "../../fsarch/configuration/module/module-configuration.module.js";

@Module({
  imports: [
    StorageModule,
    ModuleConfiguration.register('STORAGE_CONFIG', {
      name: 'storage',
    }),
  ],
  controllers: [StoragesController],
})
export class StoragesModule {}

