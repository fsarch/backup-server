import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { ConnectorService } from "../../database/entities/connector-service.entity.js";
import { InjectRepository } from "@nestjs/typeorm";
import { Connector } from "../../database/entities/connector.entity.js";

@Injectable()
export class ConnectorServiceService {
  constructor(
    @InjectRepository(Connector)
    private readonly connectorRepository: Repository<Connector>,
    @InjectRepository(ConnectorService)
    private readonly connectorServiceRepository: Repository<ConnectorService>,
  ) {
  }

  public async getAllForDisplay() {
    const entities = await this.connectorRepository.createQueryBuilder('c')
      .leftJoin(ConnectorService, 'cs', 'cs.connectorId = c.id')
      .select([
        'cs.id AS id',
        'cs.name AS name',
        'c.id AS "connectorId"',
        'c.name AS "connectorName"',
      ])
      .getRawMany();

    return entities.map((entity) => ({
      id: entity.id,
      name: entity.name,
      connector: {
        id: entity.connectorId,
        name: entity.connectorName,
      },
    }));
  }

  public async create(data: Partial<ConnectorService>) {
    const entity = this.connectorServiceRepository.create({
      id: crypto.randomUUID(),
      ...data,
    });
    return this.connectorServiceRepository.save(entity);
  }
}
