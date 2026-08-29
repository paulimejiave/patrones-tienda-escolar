import { Order } from "@/lib/types";
import { OrderObserver } from "./OrderObserver";

/** PATRÓN: Observer — Rol: "ConcreteObserver" */
export class EmailNotifierObserver implements OrderObserver {
  readonly name = "Notificador de correo";

  onOrderConfirmed(order: Order): void {
    console.log(
      `[email] Enviando confirmación del pedido ${order.id} a ${order.customer.email}`
    );
  }
}
