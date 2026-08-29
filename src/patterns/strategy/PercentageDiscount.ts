/** PATRÓN: Strategy — Rol: "ConcreteStrategy" */
import { DiscountStrategy } from "./DiscountStrategy";

export class PercentageDiscount implements DiscountStrategy {
  constructor(
    readonly code: string,
    readonly label: string,
    private percentage: number
  ) {}

  calculate(subtotal: number): number {
    return subtotal * this.percentage;
  }
}
