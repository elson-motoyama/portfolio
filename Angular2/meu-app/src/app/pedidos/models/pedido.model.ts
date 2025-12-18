export interface Pedido {
  id: number;
  valor: number;
  desconto: number;
  aprovado: boolean;
  clienteId: number;
}
