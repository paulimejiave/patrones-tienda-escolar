import { Order } from "@/lib/types";
import { OrderObserver } from "./OrderObserver";

/**
 * PATRÓN: Observer — Rol: "Subject"
 * Mantiene la lista de interesados en saber cuándo se confirma un
 * pedido y los avisa a todos, sin saber qué hace cada uno con esa
 * información (enviar un correo, descontar inventario, etc.).
 */
export class OrderSubject {
  private observers: OrderObserver[] = [];

  subscribe(observer: OrderObserver) {
    this.observers.push(observer);
  }

  unsubscribe(observer: OrderObserver) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  notify(order: Order): string[] {
    return this.observers.map((observer) => {
      observer.onOrderConfirmed(order);
      return observer.name;
    });
  }
}
