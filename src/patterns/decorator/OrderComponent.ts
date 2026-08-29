/**
 * PATRÓN: Decorator — Rol: "Component"
 * Interfaz común entre el pedido base y cualquier "envoltorio" que le
 * agregue costo y descripción (envoltura de regalo, envío exprés...).
 */
export interface OrderComponent {
  getDescription(): string;
  getCost(): number;
}
