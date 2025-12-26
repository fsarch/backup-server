import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { StorageService } from '../../repositories/storage/storage.service.js';
import { CreateStorageDto, UpdateStorageDto } from '../../models/storage.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('storage')
@Controller({
  path: 'storages',
  version: '1',
})
@ApiBearerAuth()
export class StoragesController {
  constructor(private readonly storageService: StorageService) {}

  @Get('storages')
  async listStorages() {
    return this.storageService.findAll();
  }

  @Post('storages')
  async createStorage(@Body() body: CreateStorageDto) {
    return this.storageService.create(body as any);
  }

  @Get('storages/:id')
  async getStorage(@Param('id') id: string) {
    return this.storageService.findOne(id);
  }

  @Put('storages/:id')
  async updateStorage(@Param('id') id: string, @Body() body: UpdateStorageDto) {
    return this.storageService.update(id, body as any);
  }

  @Delete('storages/:id')
  async deleteStorage(@Param('id') id: string) {
    return this.storageService.remove(id);
  }
}

