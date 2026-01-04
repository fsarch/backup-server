import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Backup } from '../../database/entities/backup.entity.js';
import { ConnectorServiceService } from "../connector-service/connector-service.service.js";
import { ConnectorService } from "../connector/connector.service.js";

@Injectable()
export class BackupService {
  constructor(
    @InjectRepository(Backup)
    private readonly repo: Repository<Backup>,
    private readonly connectorServiceService: ConnectorServiceService,
    private readonly connectorService: ConnectorService,
  ) {}

  async create(data: Partial<Backup>) {
    const entity = this.repo.create({
      ...data,
      id: crypto.randomUUID(),
      secret: crypto.randomUUID(),
    });
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: Partial<Backup>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    if (!entity) return null;
    await this.repo.softDelete(id);
    return entity;
  }

  async runBackup(backup: Backup) {
    const connectorService = await this.connectorServiceService.findOne(backup.connectorServiceId);
    if (!connectorService) {
      throw new Error(`Connector service with ID ${backup.connectorServiceId} not found`);
    }

    const connector = await this.connectorService.findOne(connectorService.connectorId);
    if (!connector) {
      throw new Error(`Connector with ID ${connectorService.connectorId} not found`);
    }

    const res = await this.connectorService.doConnectorRequest({
      baseUrl: connector.url,
      secret: connector.secret,
      path: `/services/${connectorService.connectorServiceId}/_actions/start-backup`
    }, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: backup.id,
        secret: backup.secret,
        timeout: backup.timeoutSeconds,
      }),
    });

    console.log('url', res.status);
  }
}
