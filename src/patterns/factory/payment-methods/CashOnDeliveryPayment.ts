/** PATRÓN: Factory Method — Rol: "ConcreteProduct" */
import { generateId } from "@/lib/format";
import { PaymentMethod } from "../PaymentMethod";

export class CashOnDeliveryPayment implements PaymentMethod {
  readonly id = "cash-on-delivery";
  readonly label = "Pago contraentrega";

  pay(amount: number) {
    return { success: amount > 0, reference: generateId("COD") };
  }
}
