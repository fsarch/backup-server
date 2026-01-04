import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BackupJob } from '../../database/entities/backup-job.entity.js';
import { CronTime } from 'cron';

@Injectable()
export class BackupJobService {
  constructor(
    @InjectRepository(BackupJob)
    private readonly repo: Repository<BackupJob>,
  ) {}

  private computeNextExecution(cronExpression: string): Date | null {
    try {
      const ct = new CronTime(cronExpression);
      const next = ct.sendAt();
      // CronTime returns a Luxon DateTime; convert to JS Date
      if (next && typeof (next as any).toJSDate === 'function') {
        return (next as any).toJSDate();
      }
      if (next instanceof Date) return next;
      return null;
    } catch (e) {
      return null;
    }
  }

  async create(data: Partial<BackupJob>) {
    if (data.cronExpression) {
      const next = this.computeNextExecution(data.cronExpression);
      if (next) data.nextExecutionTime = next;
    }
    const entity = this.repo.create({
      id: crypto.randomUUID(),
      ...data,
    });
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<BackupJob>) {
    if (data.cronExpression) {
      const next = this.computeNextExecution(data.cronExpression);
      if (next) data.nextExecutionTime = next;
    }
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
