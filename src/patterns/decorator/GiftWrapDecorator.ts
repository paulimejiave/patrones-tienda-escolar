/** PATRÓN: Decorator — Rol: "ConcreteDecorator" */
import { OrderDecorator } from "./OrderDecorator";

export class GiftWrapDecorator extends OrderDecorator {
  private static readonly COST = 3000;

  getDescription(): string {
    return `${super.getDescription()} + envoltura de regalo`;
  }

  getCost(): number {
    return super.getCost() + GiftWrapDecorator.COST;
  }
}
