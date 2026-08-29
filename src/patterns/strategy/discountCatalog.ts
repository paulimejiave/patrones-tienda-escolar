/**
 * Rol de "Context" del patrón Strategy: conoce todas las estrategias
 * disponibles y selecciona cuál activar según el código que escriba el
 * cliente. El checkout solo llama a findDiscountStrategy(codigo) y
 * usa el resultado — nunca decide él mismo cómo calcular un descuento.
 */
import { DiscountStrategy } from "./DiscountStrategy";
import { NoDiscount } from "./NoDiscount";
import { PercentageDiscount } from "./PercentageDiscount";

const STRATEGIES: DiscountStrategy[] = [
  new PercentageDiscount("DESC10", "10% de descuento", 0.1),
  new PercentageDiscount("DESC20", "20% de descuento", 0.2),
];

export function findDiscountStrategy(code: string): DiscountStrategy {
  const normalized = code.trim().toUpperCase();
  return STRATEGIES.find((s) => s.code === normalized) ?? new NoDiscount();
}
