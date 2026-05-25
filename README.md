# Kairo

> Open source ecommerce framework for Next.js

Kairo is a production-ready, feature-based ecommerce boilerplate built on Next.js 16. Designed to be reused across multiple projects, with a clean separation between business logic, infrastructure, and UI — swappable providers at every key layer.

---

## Features

- **Feature-based architecture** — cada dominio es autónomo con sus propias queries, services, repositories y mappers
- **Provider-agnostic core** — cambiás de Stripe a MercadoPago, de Cloudinary a S3, de Redis a Upstash sin tocar lógica de negocio
- **Type-safe throughout** — Zod en validaciones, `next-safe-action` en server actions, `@t3-oss/env-nextjs` en variables de entorno
- **Event-driven** — bus de eventos interno para comunicación entre features sin acoplamiento directo
- **Admin panel incluido** — gestión de productos, órdenes, clientes, banners, cupones y analytics

---

## Tech Stack

| Capa           | Tecnología                          |
| -------------- | ----------------------------------- |
| Framework      | Next.js 16 (App Router + Turbopack) |
| Lenguaje       | TypeScript 5.9                      |
| Base de datos  | PostgreSQL + Prisma                 |
| Estilos        | Tailwind CSS v4                     |
| Validación     | Zod v4                              |
| Server Actions | next-safe-action                    |
| Estado cliente | Zustand                             |
| Cache          | Upstash Redis                       |
| Email          | Resend                              |
| Storage        | Cloudinary / S3 / R2                |
| Pagos          | Stripe / MercadoPago                |
| Tests          | Vitest + Playwright                 |

---

## Estructura del proyecto

```
src/
├── app/          # Rutas Next.js (public, auth, admin, api)
├── features/     # Lógica de negocio por dominio
├── core/         # Infraestructura y providers intercambiables
├── shared/       # Componentes, hooks y utils reutilizables
├── config/       # Configuración centralizada por módulo
└── docs/         # Documentación de arquitectura
```

Documentación detallada en [`src/docs/architecture/`](./src/docs/architecture/).

---

## Requisitos

- Node.js >= 20.0.0
- pnpm >= 10.0.0
- PostgreSQL >= 15

---

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/kairo/kairo.git
cd kairo

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local

# Generar cliente Prisma y correr migraciones
pnpm run db:generate
pnpm run db:migrate

# Seed de datos iniciales (opcional)
pnpm run db:seed

# Iniciar en desarrollo
pnpm run dev
```

---

## Scripts disponibles

| Script                     | Descripción                               |
| -------------------------- | ----------------------------------------- |
| `pnpm run dev`             | Servidor de desarrollo con Turbopack      |
| `pnpm run build`           | Build de producción                       |
| `pnpm run lint`            | Lint con cero warnings permitidos         |
| `pnpm run type-check`      | Verificación de tipos sin emitir          |
| `pnpm run format`          | Formateo con Prettier                     |
| `pnpm run validate`        | type-check + lint + tests (ideal para CI) |
| `pnpm run db:migrate`      | Correr migraciones en desarrollo          |
| `pnpm run db:migrate:prod` | Deploy de migraciones en producción       |
| `pnpm run db:studio`       | Abrir Prisma Studio                       |
| `pnpm run test`            | Tests unitarios e integración con Vitest  |
| `pnpm run test:e2e`        | Tests end-to-end con Playwright           |
| `pnpm run test:coverage`   | Reporte de cobertura                      |

---

## Convenciones

- Commits siguiendo [Conventional Commits](https://www.conventionalcommits.org/)
- Linting automático en pre-commit con Husky + lint-staged
- Flujo de capas: `types → schema → repository → mapper → service → query → action → component`

---

## Roadmap

- [ ] Schema Prisma base
- [ ] Core: env, database, cache, events
- [ ] Feature: auth y users
- [ ] Feature: products y categories
- [ ] Feature: cart y checkout
- [ ] Feature: orders y payments
- [ ] Admin panel
- [ ] Documentación completa

---

## Licencia

MIT — libre para uso personal y comercial.
