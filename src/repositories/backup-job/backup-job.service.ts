import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupJob } from '../../database/entities/backup-job.entity.js';

@Injectable()
export class BackupJobService {
  constructor(
    @InjectRepository(BackupJob)
    private readonly repo: Repository<BackupJob>,
  ) {}

  async create(data: Partial<BackupJob>) {
    const entity = this.repo.create(data as BackupJob);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<BackupJob>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) return null;
    await this.repo.softDelete(id);
    return entity;
  }
}

