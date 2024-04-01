import { Prato } from "./prato"

export class PedidoPrato {
    pedido?: string
    prato?: Prato
    quantidade?: number
    _id?: string
    acompanhamentos?: Prato[]
}