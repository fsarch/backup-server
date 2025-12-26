import { Module } from '@nestjs/common';
import { ConnectorModule } from "./connector/connector.module.js";

@Module({
  imports: [ConnectorModule],
})
export class RepositoriesModule {}
