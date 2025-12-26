import { Module } from '@nestjs/common';
import { ConnectorsModule } from './connectors/connectors.module.js';

@Module({
  imports: [ConnectorsModule],
})
export class ControllersModule {}
