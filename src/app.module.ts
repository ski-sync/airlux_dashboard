import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfluxdbModule } from './influxdb.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    InfluxdbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
