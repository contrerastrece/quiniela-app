# ⚽ Quiniela-Contra

Aplicación de predicciones deportivas (quiniela) donde los usuarios compiten pronosticando resultados de partidos de fútbol de las principales ligas europeas.

## 🚀 Stack

- **Framework:** Next.js 14 (App Router)
- **Autenticación:** Supabase Auth (Google OAuth)
- **Base de datos:** Supabase PostgreSQL (RLS habilitado)
- **Estado global:** Zustand
- **Server state:** TanStack React Query
- **Estilos:** Tailwind CSS
- **Alertas:** SweetAlert2
- **API externa:** [football-data.org](https://www.football-data.org/)

## ✨ Funcionalidades

- **Login con Google** — Autenticación mediante Supabase + OAuth de Google.
- **Ligas disponibles** — Liga MX, Premier League, La Liga, Bundesliga, Serie A, Ligue 1.
- **Predicciones por fecha** — Selecciona el marcador de cada partido y guarda tus picks.
- **Mis Picks** — Revisa las predicciones que ya guardaste para cada jornada.
- **Sistema de puntuación:**
  - 1 pt por acertar resultado final (local gana, visitante gana o empate)
  - 1 pt por acertar goles del equipo local
  - 1 pt por acertar goles del equipo visitante
  - 1 pt extra por resultado exacto
  - -1 pt por no acertar nada
- **Ranking** — Tabla de posiciones con los puntajes de todos los participantes.
- **Perfil** — Información del usuario y cierre de sesión.

## 🛠️ Empezar

```bash
git clone <repo-url>
cd quiniela-contra
npm install
```

### Variables de entorno

Copia `.env.template` a `.env.local` y completa los valores:

| Variable | Descripción |
|---|---|
| `API_TOKEN` | Token de football-data.org |
| `NEXT_PUBLIC_API_URL` | URL base de la app (http://localhost:3000 en dev) |
| `NEXT_PUBLIC_SUPABASE_URL` | URL de tu proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key de Supabase |

```bash
npm run dev
```

## 🗄️ Base de datos

Ejecuta `supabase_migration.sql` en el SQL Editor de Supabase para crear las tablas y funciones necesarias:

- `tbl_users`, `tbl_matches`, `tbl_predictions`, `tbl_quiniela`, `tbl_rank`, `tbl_results`
- Función `insert_user()` (trigger al registrarse)
- Función `calculate_points_and_update_status()` (trigger al finalizar un partido)
- RPC `get_user_points()` para el ranking

## 🔐 Google OAuth (Supabase Auth)

La autenticación usa Supabase Auth con Google como proveedor OAuth.

### Configuración en Supabase

1. Ve a **Authentication > Providers** y habilita Google.
2. Copia los valores de **Client ID** y **Client Secret** desde Google Cloud Console (ver abajo).
3. En **Authentication > Settings**:
   - **Site URL**: `https://tudominio.com` (la URL donde esté desplegada la app)
   - **Additional Redirect URLs**: `https://tudominio.com/auth/callback`

### Configuración en Google Cloud Console

1. Crea un proyecto o ve a [Google Cloud Console > APIs & Services > Credentials](https://console.cloud.google.com/apis/credentials).
2. Crea una credencial **OAuth 2.0 Client ID** (tipo Aplicación web).
3. En **Authorized redirect URIs** agrega:
   ```
   https://<PROJECT_REF>.supabase.co/auth/v1/callback
   ```
   El `<PROJECT_REF>` es el subdominio de tu proyecto Supabase (ej: `cjmgzdzxstgafesrrxln`).
4. Copia el Client ID y Client Secret a Supabase Auth.

### Flujo de autenticación

```
Usuario → LoginForm (signInWithOAuth)
       → Google (autenticación)
       → Supabase callback (/auth/v1/callback)
       → Tu app (/auth/callback → intercambia code por session)
       → Redirige a /competitions
```

## ☁️ Despliegue

La app está lista para desplegarse en Vercel. Asegúrate de configurar las mismas variables de entorno en Vercel.
