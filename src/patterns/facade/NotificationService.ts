/** Subsistema independiente: solo sabe mandar notificaciones. */
export class NotificationService {
  sendConfirmation(customerEmail: string, orderId: string) {
    return { to: customerEmail, subject: `Confirmación de pedido ${orderId}` };
  }
}
