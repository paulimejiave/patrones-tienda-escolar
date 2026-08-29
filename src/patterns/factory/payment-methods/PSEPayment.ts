/** PATRÓN: Factory Method — Rol: "ConcreteProduct" */
import { generateId } from "@/lib/format";
import { PaymentMethod } from "../PaymentMethod";

export class PSEPayment implements PaymentMethod {
  readonly id = "pse";
  readonly label = "PSE (débito bancario)";

  pay(amount: number) {
    return { success: amount > 0, reference: generateId("PSE") };
  }
}
