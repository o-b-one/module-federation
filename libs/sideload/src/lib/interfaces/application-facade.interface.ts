import {ILoadComponentConfiguration} from "./configuration.interface";

export interface IApplicationFacade<ExportedComponents extends Record<string, any>> {
  getComponentLoadObject(component: keyof ExportedComponents): ILoadComponentConfiguration<ExportedComponents, any>;
}
