import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BackupJobService } from '../../repositories/backup-job/backup-job.service.js';
import { CreateBackupJobDto, UpdateBackupJobDto, BackupJobDto } from '../../models/backup-job.dto.js';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@ApiTags('backup-job')
@Controller({
  path: 'backup-jobs',
  version: '1',
})
@ApiBearerAuth()
export class BackupJobsController {
  constructor(private readonly backupJobService: BackupJobService) {}

  @Get('')
  @ApiOkResponse({ description: 'List backup jobs', type: [BackupJobDto] })
  async listBackupJobs() {
    const entities = await this.backupJobService.findAll();
    return entities.map(e => instanceToPlain(plainToInstance(BackupJobDto as any, e, { excludeExtraneousValues: true })));
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Backup job created', type: BackupJobDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createBackupJob(@Body() body: CreateBackupJobDto) {
    const created = await this.backupJobService.create(body as any);
    return instanceToPlain(plainToInstance(BackupJobDto as any, created, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get backup job', type: BackupJobDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getBackupJob(@Param('id') id: string) {
    const found = await this.backupJobService.findOne(id);
    return instanceToPlain(plainToInstance(BackupJobDto as any, found, { excludeExtraneousValues: true }));
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated backup job', type: BackupJobDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async updateBackupJob(@Param('id') id: string, @Body() body: UpdateBackupJobDto) {
    const updated = await this.backupJobService.update(id, body as any);
    return instanceToPlain(plainToInstance(BackupJobDto as any, updated, { excludeExtraneousValues: true }));
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted backup job', type: BackupJobDto })
  async deleteBackupJob(@Param('id') id: string) {
    const removed = await this.backupJobService.remove(id);
    return instanceToPlain(plainToInstance(BackupJobDto as any, removed, { excludeExtraneousValues: true }));
  }
}
