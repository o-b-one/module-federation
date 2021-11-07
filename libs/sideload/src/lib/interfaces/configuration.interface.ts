export interface ILoadComponentConfiguration<ExportedComponents = any,
  T extends keyof ExportedComponents = any> {
  remoteEntry: string;
  remoteName: string;
  exposedModule: string;
  elementName?: string; // for web-component usage
  componentName?: T; // for ng-component usage
  configuration: Pick<ExportedComponents, T>;
}
