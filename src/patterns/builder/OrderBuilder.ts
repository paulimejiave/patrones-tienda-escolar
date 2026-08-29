/**
 * PATRÓN: Builder
 * Construye un pedido paso a paso mediante una cadena de métodos
 * (fluent interface) en vez de un constructor con muchos parámetros
 * opcionales. El mismo builder sirve para armar un pedido "exprés"
 * (solo lo esencial) o uno "completo" (con nota, envoltura, entrega
 * programada), según qué métodos se encadenen antes de build().
 */
import { generateId } from "@/lib/format";
import { AddonId, CartItem, Customer, Order } from "@/lib/types";

export class OrderBuilder {
  private items: CartItem[] = [];
  private customer: Customer = { name: "", email: "", address: "" };
  private note?: string;
  private scheduledDelivery?: string;
  private addonIds: AddonId[] = [];
  private discountCode = "";
  private paymentMethodType = "";

  setItems(items: CartItem[]): this {
    this.items = items;
    return this;
  }

  setCustomer(customer: Customer): this {
    this.customer = customer;
    return this;
  }

  setNote(note: string): this {
    this.note = note;
    return this;
  }

  setScheduledDelivery(date: string): this {
    this.scheduledDelivery = date;
    return this;
  }

  addAddon(addon: AddonId): this {
    if (!this.addonIds.includes(addon)) this.addonIds.push(addon);
    return this;
  }

  setDiscountCode(code: string): this {
    this.discountCode = code;
    return this;
  }

  setPaymentMethodType(type: string): this {
    this.paymentMethodType = type;
    return this;
  }

  build(): Order {
    return {
      id: generateId("PED"),
      createdAt: new Date().toISOString(),
      items: this.items,
      customer: this.customer,
      note: this.note,
      scheduledDelivery: this.scheduledDelivery,
      addonIds: this.addonIds,
      discountCode: this.discountCode,
      paymentMethodType: this.paymentMethodType,
    };
  }
}
