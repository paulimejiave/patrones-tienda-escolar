import { CartItem } from "@/lib/types";

/** Subsistema independiente: no sabe nada de pago, envío ni notificaciones. */
export class InventoryService {
  reserve(items: CartItem[]) {
    return items.map((i) => ({ productId: i.id, reservado: i.qty }));
  }
}
