# CODING DOJO - Guestbook exercise

## Requirements

TO ADD

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