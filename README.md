# Next.js 13 Dashboard with Clerk Authentication

A Next.js 13 App Router application with [Clerk](https://clerk.com) handling
authentication in front of a full analytics dashboard — route groups, protected
pages, hosted sign-in and sign-up, and a user profile screen.

**[Live demo →](https://next13-auth-vette.vercel.app)**

## Features

- **Middleware-level route protection.** Everything is private by default; the
  public surface is declared, not the private one.
- **Hosted sign-in and sign-up** mounted as Clerk components rather than
  hand-built forms, themed through `@clerk/themes`.
- **Dashboard** with stat cards, a revenue bar chart, a recent-activity list,
  tabs, a team switcher and a command-palette search.
- **Date range picker** for scoping the dashboard view.
- **Profile page** under the authenticated layout.
- **Light and dark themes** via `next-themes`, no flash on first paint.

## Stack

| | |
| --- | --- |
| Framework | Next.js 13 (App Router) |
| Auth | Clerk (`@clerk/nextjs`, `@clerk/themes`) |
| Database | PlanetScale serverless driver |
| UI | shadcn/ui on Radix primitives + Tailwind CSS |
| Charts | Recharts |
| Forms | react-hook-form + Zod via `@hookform/resolvers` |
| Misc | `cmdk` (command menu), `sonner` (toasts), `react-day-picker`, `date-fns` |
| Env safety | `@t3-oss/env-nextjs` |

## Route structure

Route groups keep the two layouts apart without leaking into the URL:

```
app/
├── (auth)/
│   ├── layout.tsx          # centred, chrome-free
│   └── (routes)/
│       ├── login/
│       └── register/
├── (dashboard)/
│   ├── layout.tsx          # nav, user menu, theme toggle
│   ├── page.tsx            # the dashboard
│   └── profile/
└── layout.tsx              # ClerkProvider + theme provider
```

## How the auth wiring works

The entire protection story is the middleware:

```ts
import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/api/:path*'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

Two things worth noticing:

- **Deny by default.** Every route the matcher covers requires a session unless
  it is named in `publicRoutes`. The inverse — listing what to protect — is how
  a new page ends up shipping unauthenticated because someone forgot to add it.
- **The matcher deliberately skips static assets and `_next`.** Running auth
  middleware on every image and chunk is a measurable cost for no benefit.

Because the check happens in middleware, the dashboard pages never render a
loading state for the session, and there is no client-side redirect flicker —
an unauthenticated request never reaches the page at all.

## Running locally

```bash
git clone https://github.com/Vette1123/next13-auth.git
cd next13-auth
npm install
```

Create `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
DATABASE_URL=mysql://...   # PlanetScale connection string
```

```bash
npm run dev
```

Keys come from the Clerk dashboard; the app will not boot without them, by
design — `@t3-oss/env-nextjs` validates the environment at startup rather than
letting a missing key surface as a runtime error later.

## Notes

The dashboard UI started from the shadcn/ui example and was kept as the
protected surface — the point of the project was the auth and routing wiring
around it, not the chart data, which is static.

---

Built by [Mohamed Gado](https://mohamedgado.com) · 2023
