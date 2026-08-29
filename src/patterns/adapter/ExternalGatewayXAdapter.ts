/**
 * PATRÓN: Adapter — Rol: "Adapter"
 * Traduce entre la interfaz que expone ExternalGatewayX y la interfaz
 * PaymentGateway que espera la aplicación, sin modificar ninguna de
 * las dos clases.
 */
import { ExternalGatewayX } from "./ExternalGatewayX";
import { PaymentGateway } from "./PaymentGateway";

export class ExternalGatewayXAdapter implements PaymentGateway {
  constructor(private gateway: ExternalGatewayX = new ExternalGatewayX()) {}

  charge(amountInCents: number) {
    const result = this.gateway.processTransaction({
      total_cents: amountInCents,
      currency: "COP",
    });
    return { ok: result.status === "SUCCESS", reference: result.tx_id };
  }
}
