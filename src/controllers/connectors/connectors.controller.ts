import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ConnectorService } from '../../repositories/connector/connector.service.js';
import { CreateConnectorDto, UpdateConnectorDto, ConnectorDto } from '../../models/connector.dto.js';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiExtraModels, getSchemaPath } from "@nestjs/swagger";
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PaginationResultDto } from '../../fsarch/pagination/dto/pagination-result.dto.js';
import { ApiPaginatedResponse } from '../../fsarch/pagination/decorators/api-paginated-response.decorator.js';

@ApiTags('connector')
@ApiExtraModels(PaginationResultDto, ConnectorDto)
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
  @Get('')
  @ApiPaginatedResponse(ConnectorDto)
  async listConnectors() {
    const entities = await this.connectorService.findAll();
    const data = entities.map(e => instanceToPlain(plainToInstance(ConnectorDto as any, e, { excludeExtraneousValues: true })));
    return { data, total: data.length, page: 1, pageSize: data.length };
  }

  @Post('')
  @ApiCreatedResponse({ description: 'Connector created', type: ConnectorDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createConnector(@Body() body: CreateConnectorDto) {
    const created = await this.connectorService.create(body as any);
    return instanceToPlain(plainToInstance(ConnectorDto as any, created, { excludeExtraneousValues: true }));
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get connector', type: ConnectorDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  async getConnector(@Param('id') id: string) {
    const found = await this.connectorService.findOne(id);
    return instanceToPlain(plainToInstance(ConnectorDto as any, found, { excludeExtraneousValues: true }));
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated connector', type: ConnectorDto })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async updateConnector(@Param('id') id: string, @Body() body: UpdateConnectorDto) {
    const updated = await this.connectorService.update(id, body as any);
    return instanceToPlain(plainToInstance(ConnectorDto as any, updated, { excludeExtraneousValues: true }));
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Deleted connector', type: ConnectorDto })
  async deleteConnector(@Param('id') id: string) {
    const removed = await this.connectorService.remove(id);
    return instanceToPlain(plainToInstance(ConnectorDto as any, removed, { excludeExtraneousValues: true }));
  }
}
