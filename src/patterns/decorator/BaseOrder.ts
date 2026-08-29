/** PATRÓN: Decorator — Rol: "ConcreteComponent" */
import { CartItem } from "@/lib/types";
import { OrderComponent } from "./OrderComponent";

export class BaseOrder implements OrderComponent {
  constructor(private items: CartItem[]) {}

  getDescription(): string {
    return `Pedido de ${this.items.length} producto(s)`;
  }

  getCost(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}
