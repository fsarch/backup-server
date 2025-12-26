import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from './storage.service.js';
import { Storage } from '../../database/entities/storage.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Storage])],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}

