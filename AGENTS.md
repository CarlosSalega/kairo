# AGENTS.md

Reglas de operación para agentes autónomos trabajando en **Kairo**.

Leer `CLAUDE.md` primero — este archivo asume que ya conocés la arquitectura del proyecto.

---

## Antes de empezar cualquier tarea

1. Leer `CLAUDE.md` completo
2. Revisar los archivos relevantes al dominio en el que vas a trabajar
3. Entender en qué capa vivé el cambio: `core/`, `features/`, `shared/`
4. Nunca asumir — si algo no está claro, preguntar antes de escribir código

---

## Lo que podés hacer sin aprobación humana

- Crear archivos nuevos dentro de una feature existente siguiendo la estructura establecida
- Agregar tipos, constantes, schemas Zod y validaciones
- Escribir tests unitarios para código existente
- Correr `pnpm run validate` y corregir errores de lint o tipos
- Agregar exports al `index.ts` de una feature
- Escribir o actualizar documentación en `src/docs/architecture/`
- Crear mappers y sus tests
- Agregar queries públicas o de admin dentro de una feature existente

---

## Lo que REQUIERE aprobación humana antes de proceder

- Cambios al schema de Prisma (`schema.prisma`)
- Crear o eliminar migrations de base de datos
- Agregar o remover dependencias del `package.json`
- Crear una feature nueva (carpeta en `src/features/`)
- Cambiar la firma pública de un `service` o `repository` existente
- Modificar `core/events/contracts/` (cambio de contratos rompe múltiples features)
- Cambiar configuración de `core/env/` (agrega/remueve variables de entorno requeridas)
- Cualquier cambio en `middleware.ts`
- Cambios que afecten rutas públicas existentes en `src/app/`
- Actualizar versiones de dependencias

---

## Cómo validar tu propio trabajo

Antes de dar una tarea por terminada, verificar en este orden:

```bash
# 1. Sin errores de tipos
pnpm run type-check

# 2. Sin errores de lint
pnpm run lint

# 3. Tests pasan
pnpm run test

# 4. O todo junto
pnpm run validate
```

No marcar una tarea como completa si `pnpm run validate` falla.

---

## Cómo trabajar con el flujo de capas

Siempre respetar este orden al crear código nuevo:

```
1. types/          → definir los tipos del dominio
2. schemas/        → schema Prisma (si aplica, con aprobación)
3. repositories/   → acceso a datos
4. mappers/        → transformación Prisma → dominio
5. services/       → lógica de negocio
6. queries/        → data fetching para componentes
7. actions/        → server actions con next-safe-action
8. components/     → UI
```

Si una tarea requiere saltear una capa, detenerse y consultar.

---

## Cómo manejar dependencias entre features

Las features no se importan entre sí. Si una feature necesita datos de otra:

**Opción A — Eventos (para efectos secundarios)**

```typescript
// orders emite un evento
import { emit } from "@/core/events/emit";
import { ORDER_PAID } from "@/features/orders/events/order-paid";

await emit(ORDER_PAID, { orderId, userId, items });

// inventory escucha en core/events/handlers/
```

**Opción B — Shared types (para tipos compartidos)**

```typescript
// El tipo va en shared/types/, no en ninguna feature
import { OrderSummary } from "@/shared/types";
```

**Opción C — Consultar al humano**
Si ninguna de las opciones anteriores aplica limpiamente, no inventar una solución — consultar.

---

## Convenciones al escribir código

### Siempre

- Tipado estricto, sin `any`
- Errores tipados, nunca strings sueltos
- Imports desde el `index.ts` de cada feature
- Path aliases (`@/`) en lugar de rutas relativas
- Variables de entorno solo desde `@/core/env`
- Comentarios en inglés en el código, comunicación en español

### Nunca

- Llamar a `prisma` fuera de un `repository`
- Poner lógica de negocio en un `action` (va en `service`)
- Importar entre features directamente
- Usar `process.env` directamente
- Hacer fetch desde un componente Server sin pasar por una `query`
- Commitear con `pnpm run validate` fallando

---

## Estructura de un commit

Seguir Conventional Commits:

```
feat(products): add get-featured-products query
fix(cart): correct quantity validation on add item
refactor(orders): extract payment logic to service
docs(architecture): add events flow documentation
test(inventory): add unit tests for update-stock service
chore(deps): pin zod to 4.4.3
```

Formato: `tipo(scope): descripción en minúsculas`

Tipos válidos: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

---

## Cuando algo no está claro

En orden de preferencia:

1. Buscar en `src/docs/architecture/` — puede estar documentado
2. Buscar un ejemplo similar en el código existente
3. Preguntar al humano — siempre mejor que asumir y romper algo

**Regla de oro:** Si dudás entre hacer algo y preguntar, preguntá.
