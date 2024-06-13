import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InfluxdbService } from './influxdb.service';

@Controller()
export class AppController {
  constructor(private readonly influxdbService: InfluxdbService) {}

  @Get('data')
  async getData() {
    try {
      const data = await this.influxdbService.getData();
      return data;
    } catch (error) {
      console.error('Error fetching data from InfluxDB:', error);
      throw new HttpException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'There was an error getting the data: ' + error.message,
      }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}