import type { OrderState } from "./OrderState";

/** PATRÓN: State — Rol: "ConcreteState" (estado final) */
export class CanceladoState implements OrderState {
  readonly name = "Cancelado";

  avanzar(): void {
    throw new Error("Un pedido cancelado no puede avanzar de estado.");
  }

  cancelar(): void {
    throw new Error("El pedido ya está cancelado.");
  }
}
