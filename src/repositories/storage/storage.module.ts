import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from './storage.service.js';
import { Storage } from '../../database/entities/storage.entity.js';
import { LocalStorage } from "../../database/entities/local-storage.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Storage, LocalStorage])],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}

