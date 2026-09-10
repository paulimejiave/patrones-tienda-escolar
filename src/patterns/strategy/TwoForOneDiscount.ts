import { CartItem } from "@/lib/types";
import { DiscountStrategy } from "./DiscountStrategy";

/**
 * PATRÓN: Strategy — Rol: "ConcreteStrategy"
 * Aplica una promoción 2x1 sobre los artículos del carrito.
 * Por cada 2 unidades de un mismo producto, se descuenta el valor de 1 unidad.
 */
export class TwoForOneDiscount implements DiscountStrategy {
  readonly code = "2X1_PROMO";
  readonly label = "Promoción 2x1";

  calculate(subtotal: number, items: CartItem[]): number {
    let totalDiscount = 0;

    for (const item of items) {
      // Calculamos cuántos pares (grupos de 2) hay en la cantidad de este ítem
      const pairs = Math.floor(item.quantity / 2);

      // Si hay al menos un par, descontamos el precio de 1 unidad por cada par
      if (pairs > 0) {
        totalDiscount += pairs * item.product.price;
      }
    }

    return totalDiscount;
  }
}
