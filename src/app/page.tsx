"use client";

import { useEffect } from "react";
import { PedidoContext } from "../patterns/state/PedidoContext";

export default function Home() {
  useEffect(() => {
    console.log("=== PRUEBAS DEL PATRÓN STATE (PUNTO 3) ===");

    const pedido = new PedidoContext();

    // 1. Intentar cancelar sin motivo o transición inválida
    console.log("--- Prueba 1: Transición inválida ---");
    try {
      pedido.cancelar();
    } catch (error: any) {
      console.log("Bloqueado con éxito:", error.message);
    }

    // 2. Flujo hasta el nuevo estado Devuelto
    console.log("\n--- Prueba 2: Flujo hasta estado Devuelto ---");
    console.log("Estado actual:", pedido.getEstadoActual()); // Pendiente

    pedido.avanzar(); // Pagado / Enviado
    pedido.avanzar(); // Entregado
    console.log("Estado actual:", pedido.getEstadoActual());

    // Transición al nuevo estado agregado
    pedido.avanzar(); // Devuelto
    console.log("Nuevo estado alcanzado:", pedido.getEstadoActual());

    // 3. Intento de acción en estado Devuelto (Bloqueo)
    try {
      pedido.avanzar();
    } catch (error: any) {
      console.log("Bloqueado en Devuelto:", error.message);
    }
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pruebas Patrón State Completadas</h1>
      <p>Abre la consola del navegador (F12) para ver la ejecución de los estados.</p>
    </div>
  );
}
