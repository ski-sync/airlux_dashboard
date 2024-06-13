// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { InfluxdbService } from './influxdb.service';

@Injectable()
export class AppService {
  constructor(private influxdbService: InfluxdbService) {}

  // async pushData() {
  //   const measurement = 'my_measurement';
  //   const fields = { field1: 1.23, field2: 4.56 };
  //   const tags = { tag1: 'tag_value1', tag2: 'tag_value2' };
  //   console.log('token : ' + process.env.INFLUXDB_TOKEN);
  //
  //   await this.influxdbService.writeData(measurement, fields, tags);
  // }

  generateAndPushFakeData() {
    try {
      setInterval(async () => {
        console.log('Generating and pushing fake data');
        const measurement = 'my_measurement';
        const fields = {
          field1: Math.random() * 50,
          time: Date.now(),
        };
        const tags = {
          tag1: `tag_value${Math.floor(Math.random() * 50)}`,
        };

        await this.influxdbService.writeData(measurement, fields, tags);
      }, 6000);
    } catch (error) {
      console.error('Error generating and pushing fake data:', error);
    }
  }

  getData() {
    console.log('Getting data from InfluxDB');
    console.log('token : ' + process.env.INFLUXDB_TOKEN);
    let data = this.influxdbService.getData();
    return data;
  }
}
