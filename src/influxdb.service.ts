import { Injectable } from "@nestjs/common";
import { InfluxDB, Point } from "@influxdata/influxdb-client";
import * as process from "node:process";

@Injectable()
export class InfluxdbService {
  private influxDB: InfluxDB;
  private writeApi: any;

  constructor() {
    this.influxDB = new InfluxDB({
      //url: process.env.INFLUXDB_URL,
      url: process.env.INFLUXDB_URL,
      token: process.env.INFLUXDB_TOKEN,
    });
    this.writeApi = this.influxDB.getWriteApi(
      process.env.INFLUXDB_ORG_ID,
      process.env.INFLUXDB_BUCKET,
    );
  }

  async writeData(measurement: string, fields: object, tags?: object) {
    const point = new Point(measurement).timestamp(new Date());

    Object.entries(fields).forEach(([key, value]) => {
      point.floatField(key, value);
    });

    if (tags) {
      Object.entries(tags).forEach(([key, value]) => {
        point.tag(key, value);
      });
    }

    this.writeApi.writePoint(point);
  }

  async closeWriteApi() {
    await this.writeApi.close();
  }

  async getData() {
    const queryApi = this.influxDB.getQueryApi(process.env.INFLUXDB_ORG_ID);
    const fluxQuery = `from(bucket: "${process.env.INFLUXDB_BUCKET}") |> range(start: -1h)`;
    return await queryApi.collectRows(fluxQuery);
  }
}
