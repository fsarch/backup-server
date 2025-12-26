import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { BackupJobService } from '../../repositories/backup-job/backup-job.service.js';
import { CreateBackupJobDto, UpdateBackupJobDto } from '../../models/backup-job.dto.js';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('backup-job')
@Controller({
  path: 'backup-jobs',
  version: '1',
})
@ApiBearerAuth()
export class BackupJobsController {
  constructor(private readonly backupJobService: BackupJobService) {}

  @Get('backup-jobs')
  async listBackupJobs() {
    return this.backupJobService.findAll();
  }

  @Post('backup-jobs')
  async createBackupJob(@Body() body: CreateBackupJobDto) {
    return this.backupJobService.create(body as any);
  }

  @Get('backup-jobs/:id')
  async getBackupJob(@Param('id') id: string) {
    return this.backupJobService.findOne(id);
  }

  @Put('backup-jobs/:id')
  async updateBackupJob(@Param('id') id: string, @Body() body: UpdateBackupJobDto) {
    return this.backupJobService.update(id, body as any);
  }

  @Delete('backup-jobs/:id')
  async deleteBackupJob(@Param('id') id: string) {
    return this.backupJobService.remove(id);
  }
}

