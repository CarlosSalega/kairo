# SPEC.md — Kairo Architecture Specification

Documento de referencia completo para continuar el desarrollo de **Kairo** con cualquier agente de IA.
Leer este archivo antes de escribir cualquier línea de código.

---

## 1. Identidad del proyecto

| Campo       | Valor                                       |
| ----------- | ------------------------------------------- |
| Nombre      | Kairo                                       |
| Descripción | Open source ecommerce framework for Next.js |
| Versión     | 0.1.0                                       |
| Licencia    | MIT                                         |
| Repositorio | https://github.com/kairo/kairo              |
| Estado      | En desarrollo — primer commit realizado     |

---

## 2. Stack tecnológico — versiones fijas

Todas las versiones son exactas. Sin `^` ni `~`. No actualizar sin revisión explícita.

### Runtime y framework

| Paquete    | Versión  | Razón                                        |
| ---------- | -------- | -------------------------------------------- |
| next       | 16.2.6   | Framework principal — App Router + Turbopack |
| react      | 19.2.4   | UI runtime                                   |
| react-dom  | 19.2.4   | DOM renderer                                 |
| typescript | 5.9.3    | Lenguaje principal                           |
| node       | >=20.0.0 | Runtime — engine constraint                  |
| pnpm       | >=9.0.0  | Package manager — NO npm, NO yarn            |

### Base de datos

| Paquete        | Versión | Razón                         |
| -------------- | ------- | ----------------------------- |
| @prisma/client | 7.8.0   | ORM cliente (va a producción) |
| prisma         | 7.8.0   | CLI de Prisma (devDependency) |
| PostgreSQL     | >=15    | Base de datos                 |

### Validación y type-safety

| Paquete            | Versión | Razón                                   |
| ------------------ | ------- | --------------------------------------- |
| zod                | 4.4.3   | Validación de schemas, forms y env vars |
| next-safe-action   | 8.5.2   | Server actions type-safe con Zod        |
| @t3-oss/env-nextjs | 0.13.11 | Validación de env vars en build time    |
| nuqs               | 2.8.9   | Query params tipados                    |

### UI y estilos

| Paquete                  | Versión | Razón                                        |
| ------------------------ | ------- | -------------------------------------------- |
| tailwindcss              | 4.3.0   | CSS framework — v4 sin tailwind.config.ts    |
| @tailwindcss/postcss     | 4.3.0   | PostCSS plugin para Tailwind v4              |
| shadcn (CLI)             | 4.8.0   | Generador de componentes — NO es dep, es CLI |
| clsx                     | 2.1.1   | Combinar clases condicionalmente             |
| tailwind-merge           | 3.6.0   | Merge de clases sin conflictos               |
| class-variance-authority | 0.7.1   | Variantes de componentes tipadas             |
| lucide-react             | 1.16.0  | Iconos — estándar de shadcn                  |
| tw-animate-css           | 1.4.0   | Animaciones para Tailwind v4                 |

### Radix UI (primitives de shadcn)

Instalados explícitamente con versión fija:
`@radix-ui/react-slot@1.2.4`, `@radix-ui/react-accordion@1.2.12`,
`@radix-ui/react-avatar@1.1.11`, `@radix-ui/react-checkbox@1.3.3`,
`@radix-ui/react-dialog@1.1.15`, `@radix-ui/react-dropdown-menu@2.1.16`,
`@radix-ui/react-label@2.1.8`, `@radix-ui/react-popover@1.1.15`,
`@radix-ui/react-select@2.2.6`, `@radix-ui/react-separator@1.1.8`,
`@radix-ui/react-switch@1.2.6`, `@radix-ui/react-tabs@1.1.13`,
`@radix-ui/react-tooltip@1.2.8`

### shadcn extras

| Paquete | Versión | Razón                                          |
| ------- | ------- | ---------------------------------------------- |
| cmdk    | 1.1.1   | Command palette — componente Command de shadcn |
| sonner  | 2.0.7   | Toast notifications                            |
| vaul    | 1.1.2   | Drawer para mobile                             |

### Estado cliente

| Paquete | Versión | Razón                                   |
| ------- | ------- | --------------------------------------- |
| zustand | 5.0.13  | Estado global del cliente (carrito, UI) |

### Infraestructura intercambiable

| Paquete            | Versión | Razón                                                |
| ------------------ | ------- | ---------------------------------------------------- |
| @upstash/redis     | 1.38.0  | Cache serverless                                     |
| @upstash/ratelimit | 2.0.8   | Rate limiting serverless                             |
| resend             | 6.12.3  | Email transaccional                                  |
| cloudinary         | 2.10.0  | Storage de imágenes (provider default)               |
| sharp              | 0.34.5  | Procesamiento de imágenes — requerido por next/image |

### Utilidades

| Paquete     | Versión | Razón                                   |
| ----------- | ------- | --------------------------------------- |
| server-only | 0.0.1   | Marca archivos exclusivos de servidor   |
| slugify     | 1.6.9   | Generación de slugs para URLs           |
| date-fns    | 4.3.0   | Manipulación de fechas — tree-shakeable |

### DevDependencies de calidad

| Paquete                         | Versión | Razón                                        |
| ------------------------------- | ------- | -------------------------------------------- |
| eslint                          | 9.39.4  | Linter — flat config (eslint.config.mjs)     |
| eslint-config-next              | 16.2.6  | Reglas de Next.js para ESLint 9              |
| prettier                        | 3.8.3   | Formateo de código                           |
| prettier-plugin-tailwindcss     | 0.8.0   | Ordena clases Tailwind automáticamente       |
| husky                           | 9.1.7   | Git hooks                                    |
| lint-staged                     | 17.0.5  | Lint solo sobre archivos cambiados en commit |
| @commitlint/cli                 | 21.0.1  | Validación de mensajes de commit             |
| @commitlint/config-conventional | 21.0.1  | Reglas Conventional Commits                  |
| tsx                             | 4.22.3  | Ejecuta TypeScript sin compilar (seeds)      |

### DevDependencies de testing

| Paquete                     | Versión | Razón                                  |
| --------------------------- | ------- | -------------------------------------- |
| vitest                      | 4.1.7   | Test runner — más rápido que Jest      |
| @vitejs/plugin-react        | 6.0.2   | Plugin React para Vitest               |
| @testing-library/react      | 16.3.2  | Testing de componentes                 |
| @testing-library/user-event | 14.6.1  | Simulación de interacciones de usuario |
| jsdom                       | 29.1.1  | Simulación del DOM en Node.js          |
| @types/jsdom                | 28.0.3  | Tipos de jsdom                         |
| @playwright/test            | 1.60.0  | Tests E2E con browser real             |

---

## 3. Arquitectura — tres capas principales

### Regla de dependencias entre capas

```
shared/ ← core/ ← features/ ← app/
```

- `shared/` no importa de nadie
- `core/` solo importa de `shared/`
- `features/` importa de `core/` y `shared/`, NUNCA entre features
- `app/` importa de `features/`, `core/` y `shared/`
- Las features se comunican entre sí SOLO a través de `core/events/`

---

### 3.1 `src/core/` — Infraestructura pura

Sin lógica de negocio. Providers intercambiables via adapters.

```
core/
├── analytics/        # GA4 / PostHog / Plausible
├── auth/             # Providers de autenticación
├── cache/            # Redis / Upstash / Memory
├── database/         # Prisma client, migrations, seeds
├── email/            # Resend / SES / SendGrid
├── env/              # Validación de variables de entorno
│   ├── client.ts     # Variables NEXT_PUBLIC_*
│   └── server.ts     # Variables de servidor
├── events/           # Bus de eventos interno
│   ├── bus/
│   ├── contracts/    # Tipos de eventos — contratos entre features
│   ├── emit/
│   ├── handlers/
│   ├── subscribe/
│   └── types/
├── logger/           # Logging estructurado
├── payments/         # Stripe / MercadoPago / PayPal
├── search/           # Algolia / Meilisearch / Elasticsearch
└── storage/          # Cloudinary / S3 / R2 / Local
```

**Regla crítica de `core/payments/` vs `features/payments/`:**

- `core/payments/` → abstracción del proveedor: crear preferencia, procesar webhook, verificar firma. Sin lógica de negocio.
- `features/payments/` → lógica de negocio: registrar pago en BD, actualizar estado de orden, emitir eventos.

**Regla crítica de `core/storage/` vs `features/uploads/`:**

- `core/storage/` → sube bytes. Solo infraestructura.
- `features/uploads/` → orquesta: valida tipo, guarda referencia en BD, asocia a entidad.

---

### 3.2 `src/features/` — Lógica de negocio por dominio

Cada feature es autónoma. Esta es la estructura interna de TODA feature:

```
features/[nombre]/
├── actions/          # Server actions (next-safe-action + Zod schema)
├── components/       # Componentes React de esta feature
├── hooks/            # Hooks de cliente
├── events/           # Eventos de dominio que esta feature emite
│   └── nombre-evento.ts
├── queries/
│   ├── public/       # Data fetching sin autenticación
│   └── admin/        # Data fetching protegido
├── services/         # Lógica de negocio — orquesta repositories
├── repositories/     # Acceso a datos — ÚNICO lugar que habla con Prisma
├── mappers/          # Transforman tipos Prisma → tipos de dominio
├── schemas/          # Schemas Zod de la entidad
├── validations/      # Validaciones de formularios y actions
├── types/            # Tipos TypeScript de esta feature
├── constants/        # Constantes del dominio
└── index.ts          # Exports públicos — ÚNICO punto de entrada
```

**Features del proyecto:**

| Feature    | Descripción                                |
| ---------- | ------------------------------------------ |
| auth       | Login, register, session                   |
| users      | Perfil, gestión de usuarios                |
| products   | Catálogo, stock, pricing, search           |
| categories | Categorías y menú de navegación            |
| cart       | Carrito de compras (client-side + storage) |
| checkout   | Flujo de compra multi-step                 |
| orders     | Órdenes, estados, historial                |
| inventory  | Stock y reservas                           |
| uploads    | Imágenes y archivos                        |
| payments   | Registro y estados de pagos                |
| coupons    | Cupones de descuento                       |
| banners    | Banners del storefront                     |
| reviews    | Reseñas de productos                       |

---

### 3.3 `src/shared/` — Código verdaderamente compartido

Sin lógica de dominio. Lo que cualquier capa puede importar.

```
shared/
├── components/
│   ├── ui/           # Componentes shadcn (generados por CLI)
│   ├── layouts/      # Layouts reutilizables
│   ├── forms/        # Componentes de formulario genéricos
│   ├── tables/       # Tablas genéricas
│   ├── cards/        # Cards genéricas
│   ├── modals/       # Modales genéricos
│   ├── loaders/      # Estados de carga
│   ├── feedback/     # Mensajes de feedback
│   └── empty-states/ # Estados vacíos
├── lib/
│   └── utils.ts      # cn() helper — REQUERIDO por shadcn
├── hooks/            # Hooks genéricos sin dominio
├── helpers/          # Funciones helpers
├── utils/            # Utilidades puras
├── constants/        # Constantes globales
├── validations/      # Validaciones compartidas
├── schemas/          # Schemas Zod compartidos
├── types/            # Tipos globales compartidos
└── config/           # Configuración compartida
```

**IMPORTANTE:** `shared/lib/utils.ts` es el path exacto que shadcn espera para `cn()`. No mover.

---

## 4. Flujo de capas — orden obligatorio

Al crear código nuevo para cualquier feature, respetar este orden:

```
1. types/          → definir tipos del dominio
2. schema Prisma   → con aprobación humana
3. repositories/   → acceso a datos con Prisma
4. mappers/        → Prisma types → domain types
5. services/       → lógica de negocio
6. queries/        → data fetching para componentes
7. actions/        → server actions con next-safe-action
8. components/     → UI
```

Nunca saltear capas. Un `action` nunca llama a Prisma directamente. Un `component` nunca llama a un `repository`.

---

## 5. Convenciones de código

### Nombrado de archivos

```
kebab-case          → archivos y carpetas: product-card.mapper.ts
PascalCase          → componentes React: ProductCard.tsx
camelCase           → funciones y variables: getProductBySlug()
UPPER_SNAKE_CASE    → constantes: MAX_UPLOAD_SIZE
```

### Nombrado de servicios

Nombres de acción, no de entidad:

```
✅ create-order.service.ts
✅ pay-order.service.ts
✅ cancel-order.service.ts
❌ order.service.ts
```

### Server Actions

Siempre con `next-safe-action` y schema Zod:

```typescript
// ✅ Correcto
export const createProductAction = actionClient
  .schema(createProductSchema)
  .action(async ({ parsedInput }) => {
    // lógica en el service, no acá
    return await createProductService(parsedInput)
  })
```

### Imports

Path aliases siempre. Nunca rutas relativas que suban más de un nivel:

```typescript
✅ import { Product } from '@/features/products/types'
✅ import { db } from '@/core/database'
✅ import { cn } from '@/shared/lib/utils'
❌ import { Product } from '../../../features/products/types'
```

### Exports de features

Solo a través del `index.ts`:

```typescript
✅ import { getProductBySlug } from '@/features/products'
❌ import { getProductBySlug } from '@/features/products/queries/public/get-product-by-slug'
```

### TypeScript

```typescript
// Tipos con type, no interface (salvo extends/implements)
type Product = { id: string; name: string }

// Nunca any — usar unknown si el tipo es incierto
const parse = (data: unknown): Product => { ... }

// Type imports explícitos
import { type Product } from '@/features/products/types'

// Nunca process.env directamente
import { env } from '@/core/env'
```

### Variables de entorno

Todo pasa por `src/core/env/`:

- `core/env/server.ts` → variables de servidor
- `core/env/client.ts` → variables `NEXT_PUBLIC_*`

Nunca `process.env.X` fuera de `core/env/`.

---

## 6. Configuración de archivos raíz

### Archivos en la raíz del proyecto

```
kairo/
├── .env.example          # Referencia de variables — todas documentadas
├── .eslintrc → NO        # ESLint 9 usa flat config
├── .gitignore
├── .husky/
│   ├── pre-commit        # pnpm lint-staged
│   └── commit-msg        # pnpm commitlint --edit "$1"
├── .npmrc                # engine-strict=true, auto-install-peers=true
├── .prettierignore
├── .prettierrc
├── AGENTS.md             # Protocolo de operación para agentes autónomos
├── CHANGELOG.md
├── CLAUDE.md             # Contexto del proyecto para Claude
├── components.json       # Configuración de shadcn
├── CONTRIBUTING.md
├── eslint.config.mjs     # ESLint 9 flat config
├── next.config.ts        # Config de Next.js
├── package.json
├── playwright.config.ts  # (pendiente)
├── postcss.config.mjs    # Tailwind v4 PostCSS
├── proxy.ts              # Reemplaza middleware.ts en Next.js 16
├── README.md
├── SPEC.md               # Este archivo
├── tsconfig.json
└── vitest.config.ts      # (pendiente)
```

### `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
```

### `proxy.ts` (Next.js 16)

En Next.js 16, `middleware.ts` fue renombrado a `proxy.ts`. La función exportada se llama `proxy`.
Config flag `skipMiddlewareUrlNormalize` fue renombrada a `skipProxyUrlNormalize`.

```typescript
import { NextResponse, type NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}
```

### `components.json` (shadcn)

```json
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/shared/components",
    "utils": "@/shared/lib",
    "ui": "@/shared/components/ui",
    "lib": "@/shared/lib",
    "hooks": "@/shared/hooks"
  },
  "iconLibrary": "lucide"
}
```

**Importante:** `utils` apunta a `@/shared/lib` donde vive `utils.ts` con `cn()`.

### `tsconfig.json` highlights

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "jsx": "react-jsx",
    "allowJs": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/core/*": ["./src/core/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

Sin `baseUrl` — deprecado en TS 5.9 y removido en TS 7.

---

## 7. Estilos y tema

### Tailwind v4

No existe `tailwind.config.ts`. El tema se configura en CSS:

```css
/* src/styles/globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  /* ... tokens del tema */
}
```

### shadcn — style: Default

- Color base: `neutral`
- Variables CSS en `oklch` (estándar moderno)
- Dark mode via clase `.dark` en `<html>`
- `suppressHydrationWarning` en `<html>` cuando se agregue theme provider

### `cn()` helper

```typescript
// src/shared/lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## 8. Rutas de la aplicación

```
/                         → root page (dev landing)
/(public)/
  /                       → homepage del storefront
  /productos              → listado de productos
  /productos/[slug]       → detalle de producto
  /categorias             → listado de categorías
  /ofertas                → productos en oferta
  /contacto               → formulario de contacto
  /nosotros               → página institucional

/(auth)/
  /login
  /register
  /forgot-password
  /reset-password

/admin/
  /                       → dashboard
  /productos
  /categorias
  /ordenes
  /clientes
  /uploads
  /banners
  /coupons
  /analytics
  /configuracion

/api/
  /webhooks/mercadopago
  /webhooks/stripe
  /webhooks/auth
  /uploads
  /revalidate
  /health
```

---

## 9. Commits y control de versiones

### Conventional Commits — tipos válidos

| Tipo       | Cuándo                                    |
| ---------- | ----------------------------------------- |
| `feat`     | Nueva funcionalidad                       |
| `fix`      | Corrección de bug                         |
| `refactor` | Cambio sin nueva funcionalidad ni bug fix |
| `docs`     | Documentación                             |
| `test`     | Tests                                     |
| `chore`    | Mantenimiento, deps, config               |
| `perf`     | Mejora de performance                     |
| `ci`       | CI/CD                                     |

Formato: `tipo(scope): descripción en minúsculas`

Ejemplos:

```
feat(products): add get-featured-products query
fix(cart): correct quantity validation on add item
chore(deps): pin zod to 4.4.3
refactor(orders): extract payment logic to service
```

### Pre-commit hooks

- `lint-staged` → ESLint + Prettier solo en archivos cambiados
- `commitlint` → valida formato Conventional Commits

---

## 10. Reglas para agentes — qué requiere aprobación humana

### Puede hacer sin aprobación

- Crear archivos dentro de una feature existente
- Agregar tipos, constantes, schemas, validaciones
- Escribir tests unitarios
- Correr `pnpm validate` y corregir errores
- Agregar exports al `index.ts` de una feature
- Crear mappers y queries
- Actualizar documentación en `src/docs/architecture/`

### Requiere aprobación antes de proceder

- Cambios al schema de Prisma (`schema.prisma`)
- Crear o eliminar migrations
- Agregar o remover dependencias del `package.json`
- Crear una feature nueva
- Cambiar firma pública de un `service` o `repository`
- Modificar `core/events/contracts/` — rompe múltiples features
- Cambiar `core/env/` — agrega/remueve variables requeridas
- Cualquier cambio en `proxy.ts`
- Cambios en rutas públicas de `src/app/`

---

## 11. Estado actual del proyecto

### Completado

- [x] Estructura de carpetas completa (273 directorios)
- [x] `package.json` con todas las deps y versiones fijas
- [x] `tsconfig.json` con strict mode y path aliases
- [x] `components.json` para shadcn
- [x] `src/styles/globals.css` con tema shadcn Default + Tailwind v4
- [x] `.prettierrc` + `.prettierignore`
- [x] `.gitignore`
- [x] `.npmrc`
- [x] `.env.example` con todos los providers documentados
- [x] `eslint.config.mjs` con flat config ESLint 9
- [x] `postcss.config.mjs` para Tailwind v4
- [x] `next.config.ts` con Cloudinary remote patterns
- [x] `proxy.ts` (reemplaza middleware.ts en Next.js 16)
- [x] `src/shared/lib/utils.ts` con `cn()`
- [x] `.husky/pre-commit` y `.husky/commit-msg`
- [x] `src/app/layout.tsx` raíz con Geist font
- [x] `src/app/page.tsx` dev landing
- [x] `README.md`, `CLAUDE.md`, `AGENTS.md`, `CONTRIBUTING.md`
- [x] Primer commit: `chore: initial project setup`

### Pendiente — próximos pasos en orden

- [ ] `vitest.config.ts`
- [ ] `playwright.config.ts`
- [ ] `core/env/server.ts` y `core/env/client.ts`
- [ ] `core/database/prisma/schema.prisma` — schema base
- [ ] `core/events/` — bus de eventos
- [ ] `core/cache/` — adapter de Upstash
- [ ] `features/auth/` — definir provider de auth
- [ ] `features/products/` — primera feature completa
- [ ] `src/app/(public)/layout.tsx`
- [ ] `src/app/admin/layout.tsx`

---

## 12. Decisiones pendientes

| Decisión                 | Opciones                          | Impacto                                              |
| ------------------------ | --------------------------------- | ---------------------------------------------------- |
| Auth provider            | Clerk / NextAuth v5 / Auth.js     | Cambia `core/auth/` y `features/auth/` completamente |
| Payment provider inicial | Stripe / MercadoPago / ambos      | Determina qué adapters implementar primero           |
| Search provider          | Algolia / Meilisearch / DB search | Cambia `product-search.service.ts`                   |
| Dark mode                | next-themes / manual              | Afecta `layout.tsx` raíz                             |

# 13. Roadmap de ejecución — desarrollo incremental por commits

Este proyecto se desarrolla de forma incremental, orientado a commits pequeños, auditables y reversibles.

La prioridad es:

- mantener estabilidad arquitectónica
- evitar commits gigantes
- permitir revisión humana constante
- facilitar trabajo con agentes IA
- minimizar regresiones

---

# Filosofía de ejecución

## Reglas obligatorias

- Un commit = una responsabilidad clara
- No mezclar refactors con features
- No mezclar infraestructura con lógica de negocio
- Toda nueva feature debe seguir el flujo de capas definido
- Todo commit debe dejar el proyecto en estado funcional
- Nunca romper TypeScript strict mode
- Nunca dejar tests fallando
- Nunca dejar imports rotos

---

# Orden oficial de desarrollo

El proyecto debe evolucionar en este orden:

```txt
1. Infraestructura core
2. Shared utilities
3. Auth
4. Products
5. Categories
6. Uploads
7. Cart
8. Checkout
9. Orders
10. Payments
11. Inventory
12. Admin panel
13. Search
14. Analytics
15. Performance
16. Multi-tenancy
```

No avanzar al siguiente módulo sin estabilizar el anterior.

---

# Estrategia de commits

## Tamaño ideal de commit

Un commit ideal:

- modifica entre 3 y 15 archivos
- tiene una sola intención
- puede revertirse sin romper arquitectura
- deja el proyecto compilando

Evitar:

- commits de 100+ archivos
- commits mezclando múltiples features
- refactors masivos junto a funcionalidad nueva

---

# Flujo oficial para crear una feature

Toda feature nueva sigue este pipeline exacto:

## Paso 1 — estructura

Crear carpetas internas de la feature.

Commit:

```bash
feat(feature-name): create feature structure
```

---

## Paso 2 — tipos y schemas

Crear:

- types/
- schemas/
- validations/
- constants/

Sin lógica todavía.

Commit:

```bash
feat(feature-name): add domain types and schemas
```

---

## Paso 3 — repositories

Crear acceso a datos.

NO lógica de negocio.

Commit:

```bash
feat(feature-name): add repositories
```

---

## Paso 4 — mappers

Transformar:

- Prisma types
- DTOs
- domain models

Commit:

```bash
feat(feature-name): add domain mappers
```

---

## Paso 5 — services

Agregar lógica de negocio real.

Commit:

```bash
feat(feature-name): add business services
```

---

## Paso 6 — queries

Agregar data fetching reusable.

Separar:

- public/
- admin/

Commit:

```bash
feat(feature-name): add data queries
```

---

## Paso 7 — actions

Agregar server actions con:

- next-safe-action
- Zod schemas

Commit:

```bash
feat(feature-name): add server actions
```

---

## Paso 8 — UI

Agregar:

- components/
- hooks/

Commit:

```bash
feat(feature-name): add feature UI components
```

---

## Paso 9 — tests

Agregar:

- unit tests
- integration tests

Commit:

```bash
test(feature-name): add feature tests
```

---

# Definition of Done (DoD)

Una feature se considera terminada SOLO si:

- TypeScript compila sin errores
- ESLint pasa
- Tests pasan
- Exports están centralizados en index.ts
- No existen imports relativos largos
- No existen any
- La feature respeta boundaries arquitectónicos
- Queries están separadas correctamente
- Services no contienen acceso directo a UI
- Components no contienen lógica de negocio
- README interno de la feature actualizado (si aplica)

---

# Protocolo de refactors

Los refactors:

- NO deben mezclar funcionalidad nueva
- deben mantener APIs públicas estables
- deben hacerse en commits separados

Formato:

```bash
refactor(scope): description
```

Ejemplo:

```bash
refactor(products): extract pricing logic into service
```

---

# Protocolo para agentes IA

## Antes de escribir código

El agente debe:

1. Leer SPEC.md
2. Leer CLAUDE.md and AGENTS.md, .claude and .agents folders
3. Validar arquitectura existente
4. Revisar estructura de la feature
5. Verificar exports públicos

---

## Antes de crear archivos nuevos

Preguntar:

- ¿ya existe esta responsabilidad?
- ¿ya existe un service similar?
- ¿ya existe un helper reutilizable?
- ¿esto pertenece realmente a shared/?

---

## Antes de hacer commit

Ejecutar obligatoriamente:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

Si alguno falla:

- NO commitear
- corregir primero

---

# Reglas de crecimiento arquitectónico

## No abstraer prematuramente

Solo extraer:

- adapters
- services
- helpers
- providers

cuando:

- exista duplicación real
- existan al menos 2 implementaciones
- exista necesidad concreta

---

## No crear complejidad anticipada

Evitar:

- microservicios
- CQRS complejo
- event sourcing
- workers distribuidos
- plugin systems avanzados

hasta que el proyecto realmente lo necesite.

---

# Objetivo de Kairo

Kairo NO busca ser:

- el framework más complejo
- el más abstracto
- el más enterprise

Kairo busca ser:

- pragmático
- modular
- reusable
- type-safe
- moderno
- rápido de desarrollar
- fácil de mantener
- simple de extender

La simplicidad pragmática tiene prioridad sobre la sofisticación arquitectónica.
