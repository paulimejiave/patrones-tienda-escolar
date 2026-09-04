import { OrderState } from './OrderState';
import { PedidoContext } from './PedidoContext';

export class DevueltoState implements OrderState {
  private context: PedidoContext;

  constructor(context: PedidoContext) {
    this.context = context;
  }

  public pagar(): void {
    console.log("Error: No se puede pagar un pedido que ya fue devuelto.");
  }

  public enviar(): void {
    console.log("Error: No se puede enviar un pedido que ya fue devuelto.");
  }

  public entregar(): void {
    console.log("Error: No se puede entregar un pedido devuelto.");
  }

  public devolver(): void {
    console.log("El pedido ya se encuentra registrado en estado Devuelto.");
  }

  public obtenerNombre(): string {
    return "Devuelto";
  }
}
