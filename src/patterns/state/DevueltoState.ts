import type { OrderState } from "./OrderState";
import type { PedidoContext } from "./PedidoContext";

/** PATRÓN: State – Rol: "ConcreteState" (nuevo estado agregado) */
export class DevueltoState implements OrderState {
  readonly name = "Devuelto";

  constructor(private context: PedidoContext) {}

  avanzar(): void {
    throw new Error("El pedido ya fue devuelto y finalizó su flujo.");
  }

  cancelar(): void {
    throw new Error("Un pedido devuelto no se puede cancelar.");
  }
}
