# AfternoonJS - Coding DOJO - Prisma

A quick start for Prisma.

### Install dependencies

```bash
pnpm install typescript ts-node @types/node prisma --save-dev
```

### Initialize prisma

This will create a schema.prisma file and a prisma folder.

```bash
npx prisma init --datasource-provider postgresql
```

### Setup the database

```bash
# docker-compose.yml
version: "3.8"
services:
  db:
    image: postgres:14.1-alpine
    restart: always
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
    ports:
      - "5432:5432"
    volumes:
      - ./.data:/var/lib/postgresql/data
volumes:
  db:
    driver: local
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

```
model User {
  id    Int     @id @default(uuid())
  email String  @unique
  name  String?
}
```

and push to DB

```bash
# specify the DB URL
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/demo"
```

```bash
# push changes to DB & generate client
npx prisma db push

# open DB in browser
npx prisma studio
```

### Access the DB from JS

main.ts (read some data from the DB)

```ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
```

Run it

```bash
npx ts-node main.ts
```

Write some data to the DB

```ts
async function main() {
  const users = [
    { email: 'john@euri.com', name: 'John' },
    { email: 'else@euri.com', name: 'Else', age: 12 },
  ]
  await prisma.user.createMany({
    data: users,
  })
  // ...
}
```

Query 

```ts
async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'john@euri.com',
    }
  });
  // ...
}
```

Set Index

```
model User {
  id    String  @id @default(uuid())
  email String  @unique
  name  String?
  age   Int?

  @@index([email])
}
```

### Relations

Update the schema

```
model User {
  id    String  @id @default(uuid())
  // ...
  posts Post[]
}

model Post {
  id        String     @id @default(uuid())
  title     String
  content   String?
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

Query the data

```ts
const user = await prisma.user.findUnique({
  where: {
    email: "bob@euri.com",
  },
  include: {
    posts: true,
  },
});
```

### Where is my ERD

```bash
yarn add -D prisma-erd-generator @mermaid-js/mermaid-cli @prisma/generator-helper
```

```
generator erd {
    provider = "prisma-erd-generator"
}
```

### I want a migration script

```bash
npx prisma migrate dev
npx prisma migrate dev --name remove-age
```

### Extra Information

- [Prisma - Quickstart](https://www.prisma.io/docs/getting-started/quickstart)
- [It's Prisma Time - Tuturial](https://dev.to/this-is-learning/its-prisma-time-introduction-3a3h)
- [Prisma relations](https://medium.com/yavar/prisma-relations-2ea20c42f616)
