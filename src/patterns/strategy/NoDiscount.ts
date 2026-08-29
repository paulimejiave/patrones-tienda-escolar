/** PATRÓN: Strategy — Rol: "ConcreteStrategy" (caso neutro) */
import { DiscountStrategy } from "./DiscountStrategy";

export class NoDiscount implements DiscountStrategy {
  readonly code = "NINGUNO";
  readonly label = "Sin descuento";

  calculate(): number {
    return 0;
  }
}
