# quiniela-contra

Una app de predicción deportiva (quiniela) para fútbol europeo. Usuarios predicen resultados de partidos y compiten en un ranking.

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript strict
- **Auth + DB:** Supabase (Google OAuth, PostgreSQL con RLS)
- **Datos:** [football-data.org](https://www.football-data.org/) (requiere `API_TOKEN`)
- **Estado:** TanStack React Query (cliente) + Zustand (predicciones)
- **CSS:** Tailwind CSS
- **Deploy:** Vercel

## Comandos

```bash
npm run dev      # dev server
npm run build    # build producción
npm run start    # servidor producción
npm run lint     # ESLint (next/core-web-vitals)
```

No hay test runner configurado ni CI.

## Arquitectura

- **Rutas autenticadas** dentro del route group `src/app/(quiniela)/` — la `src/middleware.ts` refresca sesión en cada request y excluye `/login`.
- **Patrón proxy:** Las API routes de Next.js (`src/app/**/api/route.ts`) delegan a `api.football-data.org`. El token se pasa desde el server, nunca del cliente.
- **Servidor Supabase:** `src/lib/supabase/server.ts` | **Cliente:** `src/lib/supabase/client.ts`
- **Sesión:** `src/lib/getUserSession.ts` se usa en server components/server actions.
- **Provider de React Query:** `src/components/provider/TansTackProvider.tsx` (nota: nombre misspelled).
- **Puntuación:** La lógica de cálculo de puntos vive en PostgreSQL (`supabase_migration.sql` — función `calculate_points_and_update_status()` disparada por trigger al cambiar resultado a `FINISHED`).
- **Cron:** `src/app/(quiniela)/cron/api/route.ts` — endpoint invocado externamente para actualizar resultados y puntuaciones de partidos finalizados.
- **Zustand:** `src/store/quiniela/quiniela-store.ts` para predicciones; `src/store/user/userStore.ts` para sesión cliente.
- **`src/store/match/` está vacío** — no tiene archivos.

## Convenciones importantes

- **Path alias `@/*` → `./src/*`** (configurado en `tsconfig.json`).
- **Barrel exports prohibidos** — imports directos siempre (`src/components/index.ts` solo tiene un comentario advirtiéndolo).
- **Variables de entorno:** `.env.template` lista las 4 necesarias (`API_TOKEN`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`). **Nota:** `.env.local` y `.env.production` están trackeados en git (comparten keys reales).
- **next.config.mjs** permite imágenes de `lh3.googleusercontent.com`, `crests.football-data.org`, `upload.wikimedia.org`, `media.wired.com`, `s.yimg.com`.
- `src/api/index.ts` exporta utilitarios `getMatches()`, `getSevenDays()` (-3 a +3 días), `groupMatchesByDate()`.

## Types

`src/types.ts` contiene interfaces TypeScript para la API de football-data.org.
