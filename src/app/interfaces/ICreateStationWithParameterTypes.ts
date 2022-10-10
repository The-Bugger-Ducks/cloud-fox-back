import { ICreateParameterType } from "./ICreateParameterType"

export interface ICreateStationWithParameterTypes {
  id: string;
  name: string;
  lat: number;
  lon: number;
  description: string;
  parameterTypes: Array<ICreateParameterType>;
}