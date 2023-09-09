export interface Pedido {
    id: number,
    cliente: string,
    telefone: string,
    valor: string,
    pedido: string,
    observacoes: string,
    status?: 'PAGO' | 'PREPARANDO' | 'ENTREGUE'
}