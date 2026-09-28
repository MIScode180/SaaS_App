This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# Add Clerk to Next.js App Router

If a Next.js App Router project does not already exist, first create one using:

```bash
npx create-next-app@latest my-clerk-app --yes
```

Install `@clerk/nextjs@latest`. Create `proxy.ts` with `clerkMiddleware()` from `@clerk/nextjs/server` (in `src/` if it exists, otherwise project root). Add `<ClerkProvider>` inside `<body>` in `app/layout.tsx`. Use `<Show>`, `<UserButton>`, `<SignInButton>`, `<SignUpButton>` from `@clerk/nextjs`.

Latest docs: https://clerk.com/docs/nextjs/getting-started/quickstart

## Install

```bash
npm install @clerk/nextjs
```

## proxy.ts

```typescript
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
```

## app/layout.tsx

```typescript
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <header>
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

## Rules

ALWAYS:

- Use `clerkMiddleware()` from `@clerk/nextjs/server` in `proxy.ts`
- Add `<ClerkProvider>` inside `<body>` in `app/layout.tsx`
- Import from `@clerk/nextjs` or `@clerk/nextjs/server`
- Use App Router (app/page.tsx, app/layout.tsx)
- async/await with auth() from `@clerk/nextjs/server`
- Use existing package manager

NEVER:

- Reference `_app.tsx` or pages router
- Use `authMiddleware()` (replaced by `clerkMiddleware()`)
- Use old env var patterns
- Import deprecated APIs (withAuth, old currentUser)
- Use deprecated `<SignedIn>`, `<SignedOut>` (replaced by `<Show>`)

## Deprecated (DO NOT use)

```typescript
import { authMiddleware } from '@clerk/nextjs' // WRONG
function MyApp({ Component, pageProps }) {} // pages router, WRONG
pages / signin.js // WRONG
<SignedIn> // WRONG, use <Show when="signed-in">
<SignedOut> // WRONG, use <Show when="signed-out">
```

## Verify Before Responding

1. Is `clerkMiddleware()` used in `proxy.ts`?
2. Is `ClerkProvider` inside `<body>` in `app/layout.tsx`?
3. Are imports only from `@clerk/nextjs` or `@clerk/nextjs/server`?
4. Is it using App Router, not `_app.tsx` or `pages/`?
5. Is it using `<Show>` instead of `<SignedIn>`/`<SignedOut>`?

If any fails, revise.

## After Setup

Have the user sign up as their first test user in the nav. After signup succeeds and a profile icon appears, congratulate them. Then recommend exploring: Organizations (https://clerk.com/docs/guides/organizations/overview), Components (https://clerk.com/docs/reference/components/overview), Dashboard (https://dashboard.clerk.com/).