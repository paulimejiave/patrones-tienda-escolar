/**
 * PATRÓN: Facade
 * Un único punto de entrada ("confirmar") que coordina, en el orden
 * correcto, cuatro subsistemas independientes: inventario, pago, envío
 * y notificaciones. El componente de UI no necesita saber que existen
 * esos cuatro servicios ni en qué orden hay que llamarlos — solo llama
 * a confirmar() y recibe un resultado.
 */
import { Order } from "@/lib/types";
import { PaymentMethod } from "@/patterns/factory/PaymentMethod";
import { InventoryService } from "./InventoryService";
import { NotificationService } from "./NotificationService";
import { PaymentService } from "./PaymentService";
import { ShippingService } from "./ShippingService";

export type CheckoutResult = {
  success: boolean;
  orderId: string;
  paymentReference?: string;
};

export class CheckoutFacade {
  private inventory = new InventoryService();
  private payment = new PaymentService();
  private shipping = new ShippingService();
  private notifications = new NotificationService();

  confirmar(order: Order, method: PaymentMethod, totalAPagar: number): CheckoutResult {
    this.inventory.reserve(order.items);

    const paymentResult = this.payment.charge(method, totalAPagar);
    if (!paymentResult.success) {
      return { success: false, orderId: order.id };
    }

    this.shipping.schedule(order.id, order.scheduledDelivery);
    this.notifications.sendConfirmation(order.customer.email, order.id);

    return { success: true, orderId: order.id, paymentReference: paymentResult.reference };
  }
}
