# Quiniela-Contra

Aplicación de predicciones deportivas donde los usuarios compiten en **grupos** pronosticando resultados de fútbol de las principales ligas europeas.

## Stack

- **Framework:** Next.js 14 (App Router), TypeScript
- **Auth + DB:** Supabase (Google OAuth, PostgreSQL con RLS)
- **Datos:** [football-data.org](https://www.football-data.org/)
- **Estado:** TanStack React Query (servidor) + Zustand (predicciones)
- **CSS:** Tailwind CSS
- **Deploy:** Vercel

## Cómo funciona

1. **Crea o únete a un grupo** — Cada grupo tiene un código de invitación único.
2. **Pronostica** — Ingresa el marcador de cada partido dentro de tu grupo.
3. **Compite** — Gana puntos y sube en el ranking del grupo.

### Puntuación por partido

| Acierto | Puntos |
|---|---|
| Resultado final (L/V/E) | +1 |
| Goles del equipo local | +1 |
| Goles del equipo visitante | +1 |
| Bonus por resultado exacto | +1 extra |
| No acertar nada | -1 |

Máximo por partido: **4 puntos**.

## Funcionalidades

- **Grupos** — Crea grupos con una competición específica o abierta a todas. Invita con código o link.
- **Predicciones** — Selecciona el marcador de cada partido desde el workspace del grupo.
- **Ranking por grupo** — Cada grupo tiene su propio ranking independiente.
- **Perfil** — Información del usuario y lista de grupos a los que pertenece.

## Empezar

```bash
git clone <repo-url>
cd quiniela-contra
npm install
```

### Variables de entorno

Copia `.env.template` a `.env.local` y completa:

| Variable | Descripción |
|---|---|
| `API_TOKEN` | Token de football-data.org |
| `NEXT_PUBLIC_API_URL` | URL base (http://localhost:3000 en dev) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run lint     # ESLint
```

## Base de datos

Ejecuta los archivos SQL en orden en el SQL Editor de Supabase:

1. `supabase_migration.sql` — Tablas y funciones base
2. `supabase_migration_v2.sql` — Grupos, miembros, ranking por grupo

### Tablas principales

- `tbl_users` — Perfiles de usuario
- `tbl_predictions` — Pronósticos con `competition_id` para filtrado por grupo
- `tbl_groups` — Grupos con código de invitación y competición asociada
- `tbl_group_members` — Relación usuario-grupo con rol (admin/member)

### Funciones RPC

- `get_user_points()` — Ranking global
- `get_group_rankings(group_id)` — Ranking por grupo (filtrado por fecha de ingreso y competición)

## Google OAuth (Supabase Auth)

1. En Supabase: **Authentication > Providers** → habilita Google.
2. En Google Cloud Console: crea un **OAuth 2.0 Client ID** con redirect URI:
   ```
   https://<PROJECT_REF>.supabase.co/auth/v1/callback
   ```
3. Copia Client ID y Client Secret a Supabase Auth.

## Despliegue

Listo para Vercel. Configura las mismas variables de entorno en el dashboard de Vercel.
