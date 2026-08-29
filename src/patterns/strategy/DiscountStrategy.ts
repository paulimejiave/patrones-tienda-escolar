import { CartItem } from "@/lib/types";

/**
 * PATRÓN: Strategy — Rol: "Strategy"
 * Cada forma de calcular un descuento implementa esta interfaz. Quien
 * usa la estrategia (el checkout) no sabe ni le importa cómo calcula
 * el descuento por dentro: solo le pide el resultado.
 */
export interface DiscountStrategy {
  readonly code: string;
  readonly label: string;
  calculate(subtotal: number, items: CartItem[]): number;
}
