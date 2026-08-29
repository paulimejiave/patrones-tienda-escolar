import { Order } from "@/lib/types";

/** PATRÓN: Observer — Rol: "Observer" */
export interface OrderObserver {
  readonly name: string;
  onOrderConfirmed(order: Order): void;
}
