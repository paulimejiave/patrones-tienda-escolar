/**
 * PATRÓN: Adapter — Rol: "Adaptee"
 * Simula el SDK de una pasarela de pago externa real: su interfaz no
 * coincide con la que espera la aplicación (otro nombre de método,
 * otra forma de los parámetros y de la respuesta). Es código de
 * terceros: no se puede modificar.
 */
export class ExternalGatewayX {
  processTransaction(payload: { total_cents: number; currency: string }): {
    status: "SUCCESS" | "FAILED";
    tx_id: string;
  } {
    return {
      status: payload.total_cents > 0 ? "SUCCESS" : "FAILED",
      tx_id: `GWX-${payload.currency}-${Math.random().toString(36).slice(2, 8)}`,
    };
  }
}
