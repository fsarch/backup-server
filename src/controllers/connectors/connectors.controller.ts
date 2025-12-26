import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ConnectorService } from '../../repositories/connector/connector.service.js';
import { CreateConnectorDto, UpdateConnectorDto, ConnectorDto } from '../../models/connector.dto.js';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { instanceToPlain, plainToInstance } from 'class-transformer';

@ApiTags('connector')
@Controller({
  path: 'connectors',
  version: '1',
})
@ApiBearerAuth()
export class ConnectorsController {
  constructor(
    private readonly connectorService: ConnectorService,
  ) {}

  // Connectors
  @Get('connectors')
  async listConnectors() {
    const entities = await this.connectorService.findAll();
    return entities.map(e => instanceToPlain(plainToInstance(ConnectorDto as any, e, { excludeExtraneousValues: true })));
  }

  @Post('connectors')
  async createConnector(@Body() body: CreateConnectorDto) {
    const created = await this.connectorService.create(body as any);
    return instanceToPlain(plainToInstance(ConnectorDto as any, created, { excludeExtraneousValues: true }));
  }

  @Get('connectors/:id')
  async getConnector(@Param('id') id: string) {
    const found = await this.connectorService.findOne(id);
    return instanceToPlain(plainToInstance(ConnectorDto as any, found, { excludeExtraneousValues: true }));
  }

  @Put('connectors/:id')
  async updateConnector(@Param('id') id: string, @Body() body: UpdateConnectorDto) {
    const updated = await this.connectorService.update(id, body as any);
    return instanceToPlain(plainToInstance(ConnectorDto as any, updated, { excludeExtraneousValues: true }));
  }

  @Delete('connectors/:id')
  async deleteConnector(@Param('id') id: string) {
    const removed = await this.connectorService.remove(id);
    return instanceToPlain(plainToInstance(ConnectorDto as any, removed, { excludeExtraneousValues: true }));
  }
}
