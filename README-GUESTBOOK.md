# CODING DOJO - Guestbook exercise

## Description

This repository contains the final code for the Guestbook exercise. This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. Credits for the original idea belong to [nexxel](https://www.nexxel.dev/blog/ct3a-guestbook).

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

## Requirements

- [x] Authentication

### Directory

Make sure you are working in the correct directory (`packages/t3-guestbook`), before running the commands:

```bash
cd packages/t3-guestbook
```

### Install dependencies

```bash
npm install
```

### Setup the database

Export the `DATABASE_URL` first:

```bash
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/demo

# check if env variable is set correctly
echo $DATABASE_URL
```

### Startup/shutdown DB

```bash
# startup the database
docker-compose up -d

# shutdown the database
docker-compose down
```

You can use [pgAdmin](https://www.pgadmin.org/) to manage the DB. Not really needed here, but it's a nice tool to have.

### The first model

The models are described in `prisma/schema.prisma`.

```bash
# push changes to DB & generate client
npx prisma db push

# regenerate the prisma client when you've changed the prisma schema
npx prisma generate

# open DB in browser
npx prisma studio
```

## Useful resources

- [Google authentication with Next Auth](https://next-auth.js.org/providers/google)

