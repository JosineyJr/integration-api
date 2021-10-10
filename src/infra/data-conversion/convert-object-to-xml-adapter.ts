import { j2xParser as ToXml } from 'fast-xml-parser';
import { IObjectToXml } from '@/data/protocols/data-conversion';

export class ConvertObjectToXmlAdapter implements IObjectToXml {
  convert(object: Record<string, unknown>): string {
    const parser = new ToXml({});
    const xml = parser.parse(object);

    return xml;
  }
}
