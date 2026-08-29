/**
 * PATRÓN: Factory Method — Rol: "Product"
 * Interfaz común que debe cumplir cualquier método de pago, sin importar
 * cómo procese el cobro internamente.
 */
export interface PaymentMethod {
  readonly id: string;
  readonly label: string;
  pay(amount: number): { success: boolean; reference: string };
}
