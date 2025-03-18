export interface Brinquedo {
  id: string;
  nome: string;
  preco: number;
  imagem: string;
  categoria: string;
  condicao: string;
  raro: boolean;
  descricao?: string;
  estoque?: number;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  descricao?: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'cliente';
  criadoEm?: string;
  atualizadoEm?: string;
}

export interface Pedido {
  id: string;
  usuario_id: string;
  status: 'pendente' | 'processando' | 'enviado' | 'entregue' | 'cancelado';
  valor_total: number;
  data_pedido: string;
  criadoEm?: string;
  atualizadoEm?: string;
  itens?: ItemPedido[];
  usuario?: Usuario;
}

export interface ItemPedido {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  produto?: Brinquedo;
}

export interface RespostaApi<T> {
  sucesso: boolean;
  dados?: T;
  erro?: string;
  mensagem?: string;
}
