"use client";

import { FormEvent, useState } from "react";
import { formatCOP } from "@/lib/format";
import { AddonId, Customer, Order } from "@/lib/types";
import { AdaptedExternalPayment } from "@/patterns/adapter/AdaptedExternalPayment";
import { OrderBuilder } from "@/patterns/builder/OrderBuilder";
import { BaseOrder } from "@/patterns/decorator/BaseOrder";
import { ExpressShippingDecorator } from "@/patterns/decorator/ExpressShippingDecorator";
import { GiftWrapDecorator } from "@/patterns/decorator/GiftWrapDecorator";
import { CheckoutFacade } from "@/patterns/facade/CheckoutFacade";
import {
  PAYMENT_METHOD_TYPES,
  PaymentMethodFactory,
  PaymentMethodType,
} from "@/patterns/factory/PaymentMethodFactory";
import { orderSubject } from "@/patterns/observer/orderNotifications";
import { useCart } from "@/patterns/singleton/useCart";
import { findDiscountStrategy } from "@/patterns/strategy/discountCatalog";

const facade = new CheckoutFacade();

const PAYMENT_LABELS: Record<string, string> = {
  "credit-card": "Tarjeta de crédito/débito",
  pse: "PSE (débito bancario)",
  "cash-on-delivery": "Pago contraentrega",
  "external-gateway": "Pasarela externa X (vía Adapter)",
};

const ADDONS: { id: AddonId; label: string; cost: number }[] = [
  { id: "gift-wrap", label: "Envoltura de regalo", cost: 3000 },
  { id: "express-shipping", label: "Envío exprés", cost: 8000 },
];

export default function CheckoutForm({
  onConfirmed,
  onBack,
}: {
  onConfirmed: (order: Order, total: number) => void;
  onBack: () => void;
}) {
  const { items, subtotal, clear } = useCart();
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "", address: "" });
  const [note, setNote] = useState("");
  const [scheduledDelivery, setScheduledDelivery] = useState("");
  const [addons, setAddons] = useState<Set<AddonId>>(new Set());
  const [discountCode, setDiscountCode] = useState("");
  const [paymentType, setPaymentType] = useState<string>("credit-card");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function toggleAddon(addon: AddonId) {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(addon)) {
        next.delete(addon);
      } else {
        next.add(addon);
      }
      return next;
    });
  }

  // PATRÓN Decorator: se envuelve el pedido base con un decorador por
  // cada extra marcado. El orden de envoltura no importa para el costo.
  let orderComponent: import("@/patterns/decorator/OrderComponent").OrderComponent = new BaseOrder(items);
  if (addons.has("gift-wrap")) orderComponent = new GiftWrapDecorator(orderComponent);
  if (addons.has("express-shipping")) orderComponent = new ExpressShippingDecorator(orderComponent);
  const addonsTotal = orderComponent.getCost() - subtotal;

  // PATRÓN Strategy: se busca la estrategia de descuento según el código escrito.
  const discountStrategy = findDiscountStrategy(discountCode);
  const discountAmount = discountStrategy.calculate(subtotal, items);

  const taxableBase = subtotal - discountAmount + addonsTotal;
  const iva = taxableBase * 0.19;
  const total = taxableBase + iva;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())) {
      newErrors.email = "Escribe un correo válido.";
    }
    if (!customer.address.trim()) newErrors.address = "La dirección es obligatoria.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // PATRÓN Builder: se arma el pedido paso a paso con una cadena de métodos.
    const builder = new OrderBuilder()
      .setItems(items)
      .setCustomer(customer)
      .setNote(note)
      .setScheduledDelivery(scheduledDelivery)
      .setDiscountCode(discountCode)
      .setPaymentMethodType(paymentType);
    addons.forEach((addon) => builder.addAddon(addon));
    const order = builder.build();

    // PATRÓN Factory Method (o Adapter si se eligió la pasarela externa)
    // para obtener el objeto de pago sin usar "new" directamente aquí.
    const paymentMethod =
      paymentType === "external-gateway"
        ? new AdaptedExternalPayment()
        : PaymentMethodFactory.create(paymentType as PaymentMethodType);

    // PATRÓN Facade: un solo llamado coordina inventario, pago, envío y notificación.
    const result = facade.confirmar(order, paymentMethod, total);
    if (!result.success) {
      setErrors({ pago: "El pago no pudo procesarse. Intenta con otro método." });
      return;
    }

    // PATRÓN Observer: se avisa a todos los interesados en el pedido confirmado.
    orderSubject.notify(order);

    clear();
    onConfirmed(order, total);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Datos de envío</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Nombre completo</label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Correo electrónico</label>
              <input
                type="text"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Dirección de entrega</label>
              <input
                type="text"
                value={customer.address}
                onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
              />
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Nota (opcional)</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Entrega programada (opcional)</label>
                <input
                  type="date"
                  value={scheduledDelivery}
                  onChange={(e) => setScheduledDelivery(e.target.value)}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold">Extras del pedido</h2>
          <p className="mb-4 text-xs uppercase tracking-wide text-neutral-500">Patrón Decorator</p>
          <div className="space-y-2">
            {ADDONS.map((addon) => (
              <label key={addon.id} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={addons.has(addon.id)}
                    onChange={() => toggleAddon(addon.id)}
                  />
                  {addon.label}
                </span>
                <span className="text-neutral-500">+ {formatCOP(addon.cost)}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold">Código de descuento</h2>
          <p className="mb-4 text-xs uppercase tracking-wide text-neutral-500">Patrón Strategy</p>
          <input
            type="text"
            placeholder="DESC10, DESC20..."
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          <p className="mt-2 text-xs text-neutral-500">
            {discountCode.trim()
              ? `Estrategia activa: ${discountStrategy.label}`
              : "Sin código, aplica la estrategia \"Sin descuento\"."}
          </p>
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold">Método de pago</h2>
          <p className="mb-4 text-xs uppercase tracking-wide text-neutral-500">
            Patrón Factory Method (+ Adapter en la pasarela externa)
          </p>
          <div className="space-y-2">
            {[...PAYMENT_METHOD_TYPES, "external-gateway"].map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment-type"
                  checked={paymentType === type}
                  onChange={() => setPaymentType(type)}
                />
                {PAYMENT_LABELS[type]}
              </label>
            ))}
          </div>
          {errors.pago && <p className="mt-2 text-xs text-red-500">{errors.pago}</p>}
        </section>

        <section className="rounded-lg border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Resumen</h2>
          <dl className="space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-neutral-500">Subtotal productos</dt>
              <dd>{formatCOP(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Extras</dt>
              <dd>{formatCOP(addonsTotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">Descuento</dt>
              <dd>− {formatCOP(discountAmount)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-500">IVA (19%)</dt>
              <dd>{formatCOP(iva)}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatCOP(total)}</dd>
            </div>
          </dl>
        </section>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
          >
            Volver al carrito
          </button>
          <button
            type="submit"
            className="flex-1 rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
