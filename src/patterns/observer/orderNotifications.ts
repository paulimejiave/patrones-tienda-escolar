import { EmailNotifierObserver } from "./EmailNotifierObserver";
import { InventoryObserver } from "./InventoryObserver";
import { OrderSubject } from "./OrderSubject";

/**
 * Instancia compartida del Subject, con los observadores ya suscritos.
 * El checkout solo llama a orderSubject.notify(pedido) cuando se
 * confirma la compra — no conoce a EmailNotifierObserver ni a
 * InventoryObserver directamente.
 */
export const orderSubject = new OrderSubject();
orderSubject.subscribe(new EmailNotifierObserver());
orderSubject.subscribe(new InventoryObserver());
