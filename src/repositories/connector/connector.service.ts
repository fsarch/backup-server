import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connector } from '../../database/entities/connector.entity.js';

@Injectable()
export class ConnectorService {
  constructor(
    @InjectRepository(Connector)
    private readonly repo: Repository<Connector>,
  ) {}

  async create(data: Partial<Connector>) {
    const entity = this.repo.create(data as Connector);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Connector>) {
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

