import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectorService } from './connector.service.js';
import { Connector } from '../../database/entities/connector.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Connector])],
  providers: [ConnectorService],
  exports: [ConnectorService],
})
export class ConnectorModule {}
