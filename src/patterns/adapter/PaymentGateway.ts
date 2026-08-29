/**
 * PATRÓN: Adapter — Rol: "Target"
 * Interfaz que la aplicación espera para cobrar a través de una
 * pasarela externa.
 */
export interface PaymentGateway {
  charge(amountInCents: number): { ok: boolean; reference: string };
}
