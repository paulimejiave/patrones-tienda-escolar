# Tienda de Patrones

Aplicación de práctica para el curso de **Arquitectura de Sistemas**, tema **patrones de diseño**. Es la misma idea de tienda escolar (catálogo, carrito, checkout) del taller de Plan de Pruebas, pero reescrita desde cero para que **9 patrones de diseño GoF** se puedan ubicar, leer y extender con claridad. A diferencia de aquel taller, este código **no tiene fallas intencionales** ni comentarios ocultos: el objetivo es entender arquitectura, no encontrar bugs.

La nomenclatura de roles (Strategy/Context/ConcreteStrategy, Subject/Observer, etc.) sigue la que usa [refactoring.guru/es/design-patterns](https://refactoring.guru/es/design-patterns), para que cada grupo pueda abrir la página del patrón en español y calzarla contra el código.

🔗 **Demo en línea:** https://patrones-tienda-escolar.vercel.app
📋 **Ficha de actividades para los estudiantes:** `/actividades.html` (enlace también visible en el encabezado de la tienda)

## Cómo ejecutar el proyecto localmente

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Los 9 patrones y dónde viven

| Patrón | Categoría | Carpeta | Dónde se usa en la tienda |
|---|---|---|---|
| Singleton | Creacional | `src/patterns/singleton/` | Única instancia del carrito (`CartStore`) |
| Factory Method | Creacional | `src/patterns/factory/` | Creación de métodos de pago (tarjeta, PSE, contraentrega) |
| Builder | Creacional | `src/patterns/builder/` | Construcción del pedido (`OrderBuilder`) en el checkout |
| Decorator | Estructural | `src/patterns/decorator/` | Extras del pedido (envoltura de regalo, envío exprés) |
| Facade | Estructural | `src/patterns/facade/` | `CheckoutFacade`, coordina inventario + pago + envío + notificación |
| Adapter | Estructural | `src/patterns/adapter/` | Integración de una pasarela de pago externa (`ExternalGatewayX`) |
| Strategy | Comportamiento | `src/patterns/strategy/` | Cálculo del descuento (`DiscountStrategy`) |
| Observer | Comportamiento | `src/patterns/observer/` | Notificaciones al confirmar un pedido |
| State | Comportamiento | `src/patterns/state/` | Ciclo de vida del pedido: Pendiente → Pagado → Enviado → Entregado |

Cada archivo trae un comentario corto indicando el patrón y el rol GoF que cumple (`Strategy`, `ConcreteStrategy`, `Context`, etc.).

## La actividad (igual para los 9 patrones)

1. **Ubicar y explicar** — encontrar los archivos donde vive el patrón, nombrar los roles con la nomenclatura de refactoring.guru, explicar con sus palabras qué problema resuelve *ahí específicamente*.
2. **Diagramar** — dibujar el diagrama de clases UML tal como está implementado, y compararlo con el diagrama genérico de la guía.
3. **Extender sin tocar lo existente** — agregar una variante nueva tocando el mínimo código fuera de su propio archivo. Es la prueba real de que entendieron el patrón: si extenderlo es fácil, está bien aplicado (principio abierto/cerrado).
4. **Exponer (5 min)** — mostrar su extensión funcionando en vivo + el diagrama, y explicar qué tan distinto se vería el código *sin* el patrón.

### Actividad de extensión específica por patrón

| Patrón | Qué construye el grupo |
|---|---|
| Singleton | Con un log, demostrar que dos componentes distintos comparten la misma instancia del carrito |
| Factory Method | Agregar un método de pago nuevo (ej. Nequi) sin modificar el código cliente que ya usa la fábrica |
| Builder | Construir dos pedidos distintos (exprés vs. completo) reutilizando el mismo builder |
| Decorator | Crear un decorador nuevo (ej. seguro de envío) y combinarlo con los que ya existen |
| Facade | Escribir a mano los pasos que la fachada resume, y comparar cuánto código se ahorra con ella |
| Adapter | Integrar una tercera pasarela de pago ficticia con una interfaz distinta, sin tocar el checkout |
| Strategy | Agregar una estrategia de descuento nueva (ej. "2x1") y enchufarla en tiempo de ejecución |
| Observer | Agregar un observador nuevo (ej. reducir inventario) sin tocar quien lo emite |
| State | Forzar una transición inválida (debe bloquearse) y luego agregar el estado "Devuelto" |

## Repartición en grupos con asistencia incierta

Si un grupo debe tomar 2 patrones, que sean **de la misma categoría** (así profundizan en un solo tipo de problema en vez de saltar entre mundos distintos):

| Categoría | Parejas sugeridas si toca fusionar |
|---|---|
| Creacionales | **Singleton + Builder** (Factory Method queda independiente) |
| Estructurales | **Facade + Decorator** (Adapter queda independiente) |
| Comportamiento | **Strategy + State** (Observer queda independiente) |

- 9 grupos → 1 patrón cada uno.
- ~6 grupos → 3 parejas + 3 independientes.
- ~3 grupos → cada grupo toma una categoría completa.

**Patrones adicionales (si el curso tiene más de 9 grupos):** Composite (categorías/combos de productos), Command (acciones del carrito con historial/deshacer), Template Method (checkout invitado vs. registrado), Chain of Responsibility (validaciones del formulario en cadena). No están implementados en este código base — quedan como ejercicio de extensión mayor para un grupo avanzado.

## Cómo evaluar

- ¿Ubicaron correctamente todos los roles del patrón (no solo "encontraron una clase")?
- ¿Su extensión funciona sin modificar código fuera de sus archivos nuevos (o con cambios mínimos y justificados)?
- ¿El diagrama que dibujaron corresponde a lo que el código realmente hace?
- ¿Explicaron qué problema traería no usar el patrón ahí (acoplamiento, `if/else` gigante, código repetido)?

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS. Sin backend: toda la lógica de patrones es TypeScript plano, independiente de React (los componentes solo la consumen).
