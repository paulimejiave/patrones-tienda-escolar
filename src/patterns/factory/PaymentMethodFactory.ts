/**
 * PATRÓN: Factory Method — Rol: "Creator"
 * Centraliza la creación de métodos de pago. El código cliente (el
 * checkout) nunca escribe "new CreditCardPayment()": siempre pide el
 * método por su tipo a esta fábrica, que decide qué clase concreta
 * instanciar.
 */
import { CashOnDeliveryPayment } from "./payment-methods/CashOnDeliveryPayment";
import { CreditCardPayment } from "./payment-methods/CreditCardPayment";
import { PSEPayment } from "./payment-methods/PSEPayment";
import { PaymentMethod } from "./PaymentMethod";

export type PaymentMethodType = "credit-card" | "pse" | "cash-on-delivery";

export const PAYMENT_METHOD_TYPES: PaymentMethodType[] = [
  "credit-card",
  "pse",
  "cash-on-delivery",
];

export class PaymentMethodFactory {
  static create(type: PaymentMethodType): PaymentMethod {
    switch (type) {
      case "credit-card":
        return new CreditCardPayment();
      case "pse":
        return new PSEPayment();
      case "cash-on-delivery":
        return new CashOnDeliveryPayment();
    }
  }
}
