import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ConnectorService } from '../../repositories/connector/connector.service.js';
import { CreateConnectorDto, UpdateConnectorDto } from '../../models/connector.dto.js';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

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
    return this.connectorService.findAll();
  }

  @Post('connectors')
  async createConnector(@Body() body: CreateConnectorDto) {
    return this.connectorService.create(body as any);
  }

  @Get('connectors/:id')
  async getConnector(@Param('id') id: string) {
    return this.connectorService.findOne(id);
  }

  @Put('connectors/:id')
  async updateConnector(@Param('id') id: string, @Body() body: UpdateConnectorDto) {
    return this.connectorService.update(id, body as any);
  }

  @Delete('connectors/:id')
  async deleteConnector(@Param('id') id: string) {
    return this.connectorService.remove(id);
  }
}

