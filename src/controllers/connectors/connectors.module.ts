import { Module } from '@nestjs/common';
import { ConnectorsController } from './connectors.controller.js';
import { ConnectorModule } from "../../repositories/connector/connector.module.js";
import { ConnectorServiceModule } from "../../repositories/connector-service/connector-service.module.js";
import { ServicesModule } from './services/services.module.js';

@Module({
  imports: [ConnectorModule, ConnectorServiceModule, ServicesModule],
  controllers: [ConnectorsController],
})
export class ConnectorsModule {}

