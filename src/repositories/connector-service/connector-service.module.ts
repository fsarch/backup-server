import { Module } from '@nestjs/common';
import { ConnectorServiceService } from './connector-service.service.js';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectorService } from "../../database/entities/connector-service.entity.js";
import { Connector } from "../../database/entities/connector.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([ConnectorService, Connector])],
  providers: [ConnectorServiceService],
  exports: [ConnectorServiceService],
})
export class ConnectorServiceModule {}
