export interface ICreateSensor {
  model: string;
  minRange: number;
  maxRange: number;
  factor: number;
  startDate: Date;
  endDate: Date;
  unit: string;
  stationId: string;
};