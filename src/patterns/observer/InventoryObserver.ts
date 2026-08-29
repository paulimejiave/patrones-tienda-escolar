import { Order } from "@/lib/types";
import { OrderObserver } from "./OrderObserver";

/** PATRÓN: Observer — Rol: "ConcreteObserver" */
export class InventoryObserver implements OrderObserver {
  readonly name = "Actualizador de inventario";

  onOrderConfirmed(order: Order): void {
    console.log(
      `[inventario] Descontando stock de ${order.items.length} producto(s) del pedido ${order.id}`
    );
  }
}
