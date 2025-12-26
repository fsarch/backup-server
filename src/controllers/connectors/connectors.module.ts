import { Module } from '@nestjs/common';
import { ConnectorsController } from './connectors.controller.js';
import { ConnectorModule } from "../../repositories/connector/connector.module.js";

@Module({
  imports: [ConnectorModule],
  controllers: [ConnectorsController],
})
export class ConnectorsModule {}

