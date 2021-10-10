export interface IObjectToXml {
  convert: (object: Record<string, unknown>) => string;
}
