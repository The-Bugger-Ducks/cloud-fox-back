import { ICreateSensor } from "./ICreateSensor"

export interface ICreateStationWithSensors {
  name: string;
  lat: number;
  lon: number;
  description: string;
  sensors: Array<ICreateSensor>;
}