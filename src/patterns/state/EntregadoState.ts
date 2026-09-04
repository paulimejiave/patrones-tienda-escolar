import type { OrderState } from "./OrderState";
import { DevueltoState } from "./DevueltoState";
import type { PedidoContext } from "./PedidoContext";

/** PATRÓN: State – Rol: "ConcreteState" */
export class EntregadoState implements OrderState {
  readonly name = "Entregado";

  constructor(private context: PedidoContext) {}

  avanzar(): void {
    // Al avanzar desde Entregado, pasa al nuevo estado Devuelto
    this.context.cambiarEstado(new DevueltoState(this.context));
  }

  cancelar(): void {
    throw new Error("Un pedido entregado no se puede cancelar.");
  }
}
