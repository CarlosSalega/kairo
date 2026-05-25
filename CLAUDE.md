# CLAUDE.md

Contexto para Claude y agentes de IA trabajando en **Kairo** — open source ecommerce framework for Next.js.

---

## Qué es este proyecto

Kairo es un boilerplate de ecommerce production-ready construido sobre Next.js 16 (App Router), TypeScript 5.9, Prisma y Tailwind CSS v4. El objetivo es ser reutilizable entre múltiples proyectos y agnóstico en capas clave (pagos, storage, cache, email, search).

---

## Arquitectura — leer antes de tocar cualquier archivo

El proyecto tiene tres capas principales. Entender la diferencia entre ellas es crítico:

### `src/core/`

Infraestructura pura. Sin lógica de negocio. Providers intercambiables.

- `core/payments/` → abstracción de Stripe/MercadoPago/PayPal
- `core/storage/` → abstracción de Cloudinary/S3/R2/local
- `core/cache/` → abstracción de Redis/Upstash/memory
- `core/email/` → abstracción de Resend/SES/SendGrid
- `core/search/` → abstracción de Algolia/Meilisearch/Elasticsearch
- `core/events/` → bus de eventos interno (emit/subscribe/contracts)
- `core/database/` → Prisma client, migrations, seeds
- `core/env/` → validación de variables de entorno con `@t3-oss/env-nextjs`

**Regla:** `core/` nunca importa de `features/`. Solo puede importar de `shared/`.

### `src/features/`

Lógica de negocio por dominio. Cada feature es autónoma.

Cada feature sigue esta estructura interna:

```
features/[nombre]/
├── actions/       # Server actions (next-safe-action)
├── components/    # Componentes React de esta feature
├── hooks/         # Hooks de cliente
├── events/        # Eventos de dominio que esta feature emite
├── queries/
│   ├── public/    # Queries sin auth
│   └── admin/     # Queries protegidas
├── services/      # Lógica de negocio (orquesta repositories)
├── repositories/  # Acceso a datos (solo habla con Prisma)
├── mappers/       # Transforman tipos Prisma → tipos de dominio
├── schemas/       # Schemas Zod de la entidad
├── validations/   # Validaciones de formularios/actions
├── types/         # Tipos TypeScript de esta feature
├── constants/     # Constantes del dominio
└── index.ts       # Exports públicos de la feature
```

**Regla:** Las features no se importan entre sí directamente. Se comunican a través de `core/events/` o de `shared/`.

### `src/shared/`

Código verdaderamente compartido. Sin lógica de dominio.

- `shared/components/` → componentes UI genéricos (no saben de productos ni órdenes)
- `shared/hooks/` → hooks genéricos
- `shared/utils/` → funciones puras utilitarias
- `shared/types/` → tipos globales

---

## Flujo de capas — respetar este orden siempre

```
types → schema Prisma → repository → mapper → service → query → action → component
```

Nunca saltear capas. Un `action` nunca llama directamente a Prisma. Un `component` nunca llama a un `repository`.

---

## Stack y versiones fijas

| Herramienta      | Versión |
| ---------------- | ------- |
| Next.js          | 16.2.6  |
| React            | 19.2.4  |
| TypeScript       | 5.9.3   |
| Prisma           | 7.8.0   |
| Zod              | 4.4.3   |
| Tailwind CSS     | 4.3.0   |
| next-safe-action | 8.5.2   |
| Zustand          | 5.0.13  |

No actualizar dependencias sin revisar breaking changes. Las versiones son fijas (sin `^` ni `~`).

---

## Convenciones de código

### Nombrado de archivos

```
kebab-case para archivos:        product.service.ts
kebab-case para carpetas:        product-image/
PascalCase para componentes:     ProductCard.tsx
camelCase para funciones/vars:   getProductBySlug()
UPPER_SNAKE para constantes:     MAX_UPLOAD_SIZE
```

### Nombrado de servicios

Los servicios usan nombres de acción, no de entidad:

```
✅ create-order.service.ts
✅ pay-order.service.ts
✅ cancel-order.service.ts
❌ order.service.ts  (demasiado genérico)
```

### Server Actions

Siempre usar `next-safe-action` con schema Zod:

```typescript
// ✅ Correcto
export const createProductAction = actionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => { ... })

// ❌ Incorrecto
export async function createProduct(formData: FormData) { ... }
```

### Imports

Usar path aliases, nunca rutas relativas que suban más de un nivel:

```typescript
✅ import { Product } from '@/features/products/types'
✅ import { db } from '@/core/database'
❌ import { Product } from '../../../features/products/types'
```

### Tipos vs interfaces

- `type` para todo, excepto cuando se necesita `extends` o `implements`
- Nunca usar `any`. Usar `unknown` si el tipo es incierto.
- Nunca usar `as` para castear salvo casos muy justificados con comentario

### Exports desde features

Solo exportar a través del `index.ts` de cada feature:

```typescript
// ✅ Correcto
import { getProductBySlug } from "@/features/products";

// ❌ Incorrecto (rompe encapsulamiento)
import { getProductBySlug } from "@/features/products/queries/public/get-product-by-slug";
```

---

## Variables de entorno

Toda variable de entorno pasa por `src/core/env/`:

- `core/env/server.ts` → variables solo de servidor
- `core/env/client.ts` → variables públicas (`NEXT_PUBLIC_*`)

Nunca acceder a `process.env` directamente fuera de `core/env/`.

---

## Base de datos

- ORM: Prisma 7
- Schema en: `src/core/database/prisma/schema.prisma`
- Migrations en: `src/core/database/migrations/`
- Seeds en: `src/core/database/seeds/`
- Nunca escribir SQL raw salvo en casos de performance muy justificados

---

## Manejo de errores

- Los `services` lanzan errores tipados, nunca strings
- Los `actions` capturan errores y retornan `{ success, data, error }` — next-safe-action lo maneja
- Los `repositories` dejan pasar los errores de Prisma hacia arriba

---

## Testing

- Unit tests: Vitest — para services, mappers, utils
- Integration tests: Vitest — para repositories contra DB de test
- E2E tests: Playwright — para flujos críticos (checkout, auth)
- Ubicación: `src/tests/` espejando la estructura de `src/`

Correr antes de cualquier commit:

```bash
pnpm run validate
```

---

## Lo que NO hacer

- ❌ No importar entre features directamente
- ❌ No usar `any`
- ❌ No acceder a `process.env` fuera de `core/env/`
- ❌ No llamar a Prisma fuera de `repositories/`
- ❌ No crear lógica de negocio en `actions/` (van en `services/`)
- ❌ No subir dependencias sin versión fija
- ❌ No crear componentes con lógica de dominio en `shared/components/`
- ❌ No saltear el flujo de capas
