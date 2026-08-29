import type { OrderState } from "./OrderState";

/** PATRÓN: State — Rol: "ConcreteState" (estado final en esta versión) */
export class EntregadoState implements OrderState {
  readonly name = "Entregado";

  avanzar(): void {
    throw new Error("El pedido ya llegó a su estado final: Entregado.");
  }

  cancelar(): void {
    throw new Error("Un pedido entregado no se puede cancelar.");
  }
}
