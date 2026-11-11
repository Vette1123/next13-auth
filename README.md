# Next.js 13 Dashboard with Clerk Authentication

A Next.js 13 App Router application with [Clerk](https://clerk.com) handling
authentication in front of a full analytics dashboard: route groups, protected
pages, hosted sign-in and sign-up, and a user profile screen.

**[Live demo →](https://next13-auth-vette.vercel.app)**

## Features

- **Middleware-level route protection.** Everything is private by default, and
  only the public routes are declared.
- **Hosted sign-in and sign-up** mounted as Clerk components instead of
  hand-built forms, themed through `@clerk/themes`.
- **Dashboard** with stat cards, a revenue bar chart, a recent-activity list,
  tabs, a team switcher and a command-palette search.
- **Date range picker** for scoping the dashboard view.
- **Profile page** under the authenticated layout.
- **Light and dark themes** via `next-themes`, no flash on first paint.

## Stack

| | |
| --- | --- |
| Framework | Next.js 13.4.7 (App Router), React 18.2 |
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

All route protection lives in the middleware:

```ts
import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({
  publicRoutes: ['/api/:path*'],
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
```

Two details:

- **Deny by default.** Every route the matcher covers requires a session unless
  it is named in `publicRoutes`. Listing the protected routes instead lets
  a new page ship unauthenticated if someone forgets to add it.
- **The matcher deliberately skips static assets and `_next`.** Running auth
  middleware on every image and chunk is a measurable cost for no benefit.

Because the check happens in middleware, the dashboard pages never render a
loading state for the session, and there is no client-side redirect flicker.
An unauthenticated request never reaches the page.

## Running locally

```bash
git clone https://github.com/Vette1123/next13-auth.git
cd next13-auth
yarn install
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
yarn dev
```

Keys come from the Clerk dashboard. The app will not boot without them:
`@t3-oss/env-nextjs` validates the environment at startup, so a missing key does
not surface as a runtime error later.

## Notes

The dashboard UI started from the shadcn/ui example and was kept as the
protected surface. The project is about the auth and routing wiring around it.
The chart data is static.

---

Built by [Mohamed Gado](https://mohamedgado.com) · 2023
