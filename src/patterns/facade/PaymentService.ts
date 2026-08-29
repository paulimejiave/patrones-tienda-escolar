import { PaymentMethod } from "@/patterns/factory/PaymentMethod";

/** Subsistema independiente: solo sabe cobrar con el método que le pasen. */
export class PaymentService {
  charge(method: PaymentMethod, amount: number) {
    return method.pay(amount);
  }
}
