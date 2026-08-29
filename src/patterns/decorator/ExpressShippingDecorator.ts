/** PATRÓN: Decorator — Rol: "ConcreteDecorator" */
import { OrderDecorator } from "./OrderDecorator";

export class ExpressShippingDecorator extends OrderDecorator {
  private static readonly COST = 8000;

  getDescription(): string {
    return `${super.getDescription()} + envío exprés`;
  }

  getCost(): number {
    return super.getCost() + ExpressShippingDecorator.COST;
  }
}
