import { generateId } from "@/lib/format";
import { PaymentMethod } from "@/patterns/factory/PaymentMethod";
import { ExternalGatewayXAdapter } from "./ExternalGatewayXAdapter";

/**
 * Conecta el Adapter (ExternalGatewayXAdapter) con la interfaz
 * PaymentMethod que ya usa el checkout, para poder ofrecerlo junto a
 * los métodos que sí vienen de la fábrica (Factory Method). El Adapter
 * como patrón vive en ExternalGatewayX / ExternalGatewayXAdapter; esta
 * clase es solo el cable que los conecta con el resto de la tienda.
 */
export class AdaptedExternalPayment implements PaymentMethod {
  readonly id = "external-gateway";
  readonly label = "Pasarela externa X (vía Adapter)";
  private adapter = new ExternalGatewayXAdapter();

  pay(amount: number) {
    const result = this.adapter.charge(Math.round(amount * 100));
    return { success: result.ok, reference: result.reference || generateId("EXT") };
  }
}
