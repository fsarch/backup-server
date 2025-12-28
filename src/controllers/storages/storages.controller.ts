import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StorageService } from '../../repositories/storage/storage.service.js';
import { CreateStorageDto, UpdateStorageDto, StorageDto } from '../../models/storage.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@ApiTags('storage')
@Controller({
  path: 'storages',
  version: '1',
})
@ApiBearerAuth()
export class StoragesController {
  constructor(private readonly storageService: StorageService) {}

  @Get('')
  async listStorages() {
    const entities = await this.storageService.findAll();
    return entities.map(e => instanceToPlain(plainToInstance(StorageDto as any, e, { excludeExtraneousValues: true })));
  }

  @Post('')
  async createStorage(@Body() body: CreateStorageDto) {
    const created = await this.storageService.create(body as any);
    return instanceToPlain(plainToInstance(StorageDto as any, created, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  async getStorage(@Param('id') id: string) {
    const found = await this.storageService.findOne(id);
    return instanceToPlain(plainToInstance(StorageDto as any, found, { excludeExtraneousValues: true }));
  }

  @Put(':id')
  async updateStorage(@Param('id') id: string, @Body() body: UpdateStorageDto) {
    const updated = await this.storageService.update(id, body as any);
    return instanceToPlain(plainToInstance(StorageDto as any, updated, { excludeExtraneousValues: true }));
  }

  @Delete(':id')
  async deleteStorage(@Param('id') id: string) {
    const removed = await this.storageService.remove(id);
    return instanceToPlain(plainToInstance(StorageDto as any, removed, { excludeExtraneousValues: true }));
  }
}
