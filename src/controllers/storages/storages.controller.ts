import { Controller, Get, Post, Put, Delete, Body, Param, BadRequestException, Inject } from '@nestjs/common';
import { StorageService } from '../../repositories/storage/storage.service.js';
import { CreateStorageDto, UpdateStorageDto, StorageDto } from '../../models/storage.dto.js';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PaginationResultDto } from '../../fsarch/pagination/dto/pagination-result.dto.js';
import { ApiPaginatedResponse } from '../../fsarch/pagination/decorators/api-paginated-response.decorator.js';
import { EStorageType } from "../../constants/enums/EStorageType.js";
import { ModuleConfigurationService } from "../../fsarch/configuration/module/module-configuration.service.js";
import { ConfigStorageType } from "../../types/ConfigStorageType.type.js";
import path from "node:path";
import fs from "node:fs/promises";

@ApiTags('storage')
@ApiExtraModels(PaginationResultDto, StorageDto)
@Controller({
  path: 'storages',
  version: '1',
})
@ApiBearerAuth()
export class StoragesController {
  constructor(
    private readonly storageService: StorageService,
    @Inject('STORAGE_CONFIG')
    private readonly storageConfigService: ModuleConfigurationService<ConfigStorageType>,
  ) {}

  @Get('')
  @ApiPaginatedResponse(StorageDto)
  async listStorages() {
    const entities = await this.storageService.findAll();
    const data = entities.map(e => instanceToPlain(plainToInstance(StorageDto as any, e, { excludeExtraneousValues: true })));
    return { data, total: data.length, page: 1, pageSize: data.length };
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Storage created', type: StorageDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createStorage(@Body() body: CreateStorageDto) {
    if (body.storageTypeId === EStorageType.LOCAL) {
      if (!body.path) {
        throw new BadRequestException('Path is required for local storage type');
      }

      const basePath = path.resolve(this.storageConfigService.get('data'), body.path);
      await fs.mkdir(basePath, {
        recursive: true,
      });
    }

    const created = await this.storageService.create(body as any);

    return instanceToPlain(plainToInstance(StorageDto as any, created, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get storage', type: StorageDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getStorage(@Param('id') id: string) {
    const found = await this.storageService.findOne(id);
    return instanceToPlain(plainToInstance(StorageDto as any, found, { excludeExtraneousValues: true }));
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated storage', type: StorageDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async updateStorage(@Param('id') id: string, @Body() body: UpdateStorageDto) {
    const updated = await this.storageService.update(id, body as any);
    return instanceToPlain(plainToInstance(StorageDto as any, updated, { excludeExtraneousValues: true }));
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted storage', type: StorageDto })
  async deleteStorage(@Param('id') id: string) {
    const removed = await this.storageService.remove(id);
    return instanceToPlain(plainToInstance(StorageDto as any, removed, { excludeExtraneousValues: true }));
  }
}
