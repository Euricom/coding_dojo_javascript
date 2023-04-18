## Description

This folder contains the final code for the Guestbook exercise. This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. 

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Brief overview

A small recap of the project structure:

- `prisma/*` - The prisma schema.
- `public/*` - Static assets including fonts and images.
- `src/env/*` - Validation for environment variables.
- `src/pages/*` - All the pages of the website.
- `src/server/*` - The backend, which includes a tRPC server, Prisma client, and auth utility.
- `src/styles/*` - Global CSS files, but we’re going to be using Tailwind CSS for most of our styles.
- `src/types/*` - Next Auth type declarations.
- `src/utils/*` - Utility functions.
