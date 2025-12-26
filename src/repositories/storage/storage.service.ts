import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from '../../database/entities/storage.entity.js';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage)
    private readonly repo: Repository<Storage>,
  ) {}

  async create(data: Partial<Storage>) {
    const entity = this.repo.create(data as Storage);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Storage>) {
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

