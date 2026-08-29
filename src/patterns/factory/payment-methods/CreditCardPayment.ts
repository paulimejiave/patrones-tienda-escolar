/** PATRÓN: Factory Method — Rol: "ConcreteProduct" */
import { generateId } from "@/lib/format";
import { PaymentMethod } from "../PaymentMethod";

export class CreditCardPayment implements PaymentMethod {
  readonly id = "credit-card";
  readonly label = "Tarjeta de crédito/débito";

  pay(amount: number) {
    return { success: amount > 0, reference: generateId("CARD") };
  }
}
