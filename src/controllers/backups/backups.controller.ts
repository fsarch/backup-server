import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags, ApiCreatedResponse, ApiBadRequestResponse } from "@nestjs/swagger";
import { PaginationResultDto } from "../../fsarch/pagination/dto/pagination-result.dto.js";
import { BackupDto, CreateBackupDto } from "../../models/backup.dto.js";
import { BackupService } from '../../repositories/backup/backup.service.js';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ApiPaginatedResponse } from '../../fsarch/pagination/decorators/api-paginated-response.decorator.js';

@ApiTags('backup')
@ApiExtraModels(PaginationResultDto, BackupDto)
@Controller({
  path: 'backups',
  version: '1',
})
@ApiBearerAuth()
export class BackupsController {
  constructor(private readonly backupService: BackupService) {}

  @Get(':backupId')
  @ApiPaginatedResponse(BackupDto)
  async getBackup(@Param('backupId') backupId: string) {
    const entity = await this.backupService.findOne(backupId);
    return instanceToPlain(plainToInstance(BackupDto as any, entity, { excludeExtraneousValues: true }));
  }

  @Get('')
  @ApiPaginatedResponse(BackupDto)
  async listBackups() {
    const entities = await this.backupService.findAll();
    const data = entities.map(e => instanceToPlain(plainToInstance(BackupDto as any, e, { excludeExtraneousValues: true })));
    return { data, total: data.length, page: 1, pageSize: data.length };
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Backup created', type: BackupDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createBackup(@Body() body: CreateBackupDto) {
    const created = await this.backupService.create(body as any);

    await this.backupService.runBackup(created);

    return instanceToPlain(plainToInstance(BackupDto as any, created, { excludeExtraneousValues: true }));
  }
}
