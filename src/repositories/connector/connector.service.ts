import { ConflictException, Injectable, Logger, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connector } from '../../database/entities/connector.entity.js';
import { PaginationResultDto } from "../../fsarch/pagination/dto/pagination-result.dto.js";

@Injectable()
export class ConnectorService {
  private readonly logger = new Logger(ConnectorService.name);

  constructor(
    @InjectRepository(Connector)
    private readonly repo: Repository<Connector>,
  ) {}

  public async doConnectorRequest(options : { baseUrl: string, secret: string; path: string, }, requestInit: RequestInit) {
    const path = options.path.startsWith('/') ? options.path.substring(1) : options.path;

    let servicesUrl = new URL(`${options.baseUrl}/${path}`);

    try {
      const metaResUrl = new URL(`${options.baseUrl}/.meta/backup`);
      this.logger.log('Fetching connector meta from {url}', {
        url: metaResUrl.toString(),
      });
      const metaRes = await fetch(metaResUrl);
      if (metaRes.ok) {
        const meta = await metaRes.json() as { path: string; servicesUrl: string; connectorApiVersion: string; };
        console.log('meta', meta);

        servicesUrl = new URL(`${meta.path}/${path}`, options.baseUrl);
      }
    } catch (error) {
      this.logger.warn('Failed to fetch connector api from {url}: {error}', {
        url: options.baseUrl,
        error,
      });
    }

    const fallbackServiceRes = await fetch(servicesUrl, requestInit);
    if (!fallbackServiceRes.ok) {
      this.logger.warn('Failed to fetch connector api from {url}: {status} {statusText}', {
        method: requestInit.method,
        url: servicesUrl.toString(),
        status: fallbackServiceRes.status,
        statusText: fallbackServiceRes.statusText,
      });
      throw new PreconditionFailedException();
    }

    return fallbackServiceRes;
  }

  public async requestConnectorServices(baseUrl: string) {
    const res = await this.doConnectorRequest({
      baseUrl,
      secret: '',
      path: '/services',
    }, {
      method: 'GET',
    });


    const services = await res.json() as PaginationResultDto<{
      id: string;
      name: string;
      description?: string;
    }>;
    this.logger.log('Fetched connector services from {url}: {services}', {
      services: JSON.stringify(services),
    });

    return services.data;
  }

  async create(data: Partial<Connector>) {
    const entity = this.repo.create({
      id: crypto.randomUUID(),
      ...(data as Connector)
    });
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

