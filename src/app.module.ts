import { Module } from '@nestjs/common';
import { FsarchModule } from './fsarch/fsarch.module.js';
import { ControllersModule } from './controllers/controllers.module.js';
import { RepositoriesModule } from './repositories/repositories.module.js';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BaseTables1766748137677 } from "./database/migrations/1766748137677-base-tables.js";

@Module({
  imports: [
    FsarchModule.register({
      auth: {},
      database: {
        entities: [
        ],
        migrations: [
          BaseTables1766748137677,
        ],
      },
    }),
    EventEmitterModule.forRoot(),
    ControllersModule,
    RepositoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
