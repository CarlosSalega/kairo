# Contributing to Kairo

Gracias por tu interés en contribuir. Este documento explica cómo hacerlo de forma ordenada.

---

## Requisitos previos

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- PostgreSQL >= 15

## Setup local

```bash
git clone https://github.com/kairo/kairo.git
cd kairo
pnpm install
cp .env.example .env.local
# completar las variables en .env.local
pnpm db:generate
pnpm db:migrate
pnpm dev
```

---

## Flujo de trabajo

1. Crear un branch desde `main`

```bash
git checkout -b feat/nombre-descriptivo
# o
git checkout -b fix/nombre-del-bug
```

2. Escribir código siguiendo las convenciones de `CLAUDE.md`

3. Validar antes de commitear

```bash
pnpm validate
```

4. Commitear siguiendo [Conventional Commits](https://www.conventionalcommits.org/)

```bash
git commit -m "feat(products): add get-featured-products query"
```

5. Abrir un Pull Request contra `main`

---

## Convenciones de commits

| Tipo | Cuándo usarlo |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `refactor` | Cambio de código sin nueva funcionalidad ni bug fix |
| `docs` | Documentación |
| `test` | Tests |
| `chore` | Tareas de mantenimiento (deps, config) |
| `perf` | Mejora de performance |
| `ci` | Cambios en CI/CD |

---

## Reglas importantes

- Seguir el flujo de capas: `types → repository → mapper → service → query → action → component`
- No importar entre features directamente — usar `core/events/` o `shared/`
- No usar `any` en TypeScript
- No acceder a `process.env` fuera de `core/env/`
- `pnpm validate` debe pasar antes de abrir un PR

---

## Reportar un bug

Abrir un issue con:
- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Versión de Node.js y pnpm

## Proponer una feature

Abrir un issue antes de escribir código. Describir el caso de uso y por qué encaja en Kairo.
