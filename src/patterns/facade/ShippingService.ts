/** Subsistema independiente: solo sabe programar envíos. */
export class ShippingService {
  schedule(orderId: string, scheduledDelivery?: string) {
    return { orderId, deliveryDate: scheduledDelivery ?? "en 3 a 5 días hábiles" };
  }
}
