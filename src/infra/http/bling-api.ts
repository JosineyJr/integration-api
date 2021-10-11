import { IObjectToXml } from '@/data/protocols/data-conversion';
import { PedidoModel } from '@/domain/models';
import { CreatePedido, ICreatePedido } from '@/domain/models/bling/http/create-pedido';
import { IHttpGetClient, IHttpPostClient } from './client';
import env from '@/main/config/env';
import { GetAllPedidos, IGetAllPedidos } from '@/domain/models/bling/http/get-all-pedidos';
import { GetPedidoByNumero, IGetPedidoByNumero } from '@/domain/models/bling/http';
import { IAddPedido } from '@/domain/use-cases';

export class BlingApi implements ICreatePedido, IGetAllPedidos, IGetPedidoByNumero {
  constructor(
    private readonly httpPostClient: IHttpPostClient,
    private readonly convertToXml: IObjectToXml,
    private readonly httpGetClient: IHttpGetClient,
    private readonly addPedido: IAddPedido,
  ) {}

  async create({ dealsData, apiKey, userName, email }: CreatePedido.Input): Promise<CreatePedido.Output> {
    const pedidoObject: PedidoModel = {
      cliente: { nome: userName, email },
      parcelas: { parcela: [{ vlr: dealsData.value, data: dealsData.add_time.toString() }] },
      obs: dealsData.status,
      itens: [
        { item: { descricao: dealsData.title, qtde: 1, vlr_unit: dealsData.value, vlr_desconto: 0, codigo: '001' } },
      ],
    } as PedidoModel;

    const pedidoXml = this.convertToXml.convert({ pedidoObject });

    await this.httpPostClient.post({
      url: 'https://bling.com.br/Api/v2/pedido/json/',
      params: { apikey: apiKey || env.blingApiKey, xml: pedidoXml },
    });

    const { pedidos: allPedidos } = await this.getAllPedidos({ apiKey });

    const findPedido = allPedidos?.find(p =>
      p.pedido.itens.find(its => its.item.descricao === pedidoObject.itens[0].item.descricao),
    );

    await this.addPedido.add(findPedido?.pedido as PedidoModel);

    if (findPedido?.pedido) return findPedido?.pedido;
  }

  async getAllPedidos({ apiKey }: GetAllPedidos.Input): Promise<GetAllPedidos.Output> {
    const result = await this.httpGetClient.get({
      url: `https://bling.com.br/Api/v2/pedidos/json/?apikey=${apiKey || env.blingApiKey}`,
    });

    const pedidos = result.retorno.pedidos as Array<{ pedido: PedidoModel }>;

    return { pedidos };
  }

  async getPedidoByNumero({ numero, apiKey }: GetPedidoByNumero.Param): Promise<GetPedidoByNumero.Result> {
    const result = await this.httpGetClient.get({
      url: `https://bling.com.br/Api/v2/pedido/${numero}/json/?apikey=${apiKey}`,
    });

    return { pedido: result.retorno.pedidos[0].pedido };
  }
}
