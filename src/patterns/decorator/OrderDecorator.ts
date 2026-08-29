/**
 * PATRÓN: Decorator — Rol: "Decorator" (base)
 * Envuelve otro OrderComponent (puede ser el pedido base u otro
 * decorador) y por defecto delega en él. Cada decorador concreto
 * sobreescribe solo lo que necesita agregar.
 */
import { OrderComponent } from "./OrderComponent";

export abstract class OrderDecorator implements OrderComponent {
  constructor(protected wrapped: OrderComponent) {}

  getDescription(): string {
    return this.wrapped.getDescription();
  }

  getCost(): number {
    return this.wrapped.getCost();
  }
}
