import 'dotenv/config'
import { defineConfig } from 'prisma/config'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not defined')
}

export default defineConfig({
  schema: 'src/core/database/prisma/schema.prisma',
  migrations: {
    path: 'src/core/database/prisma/migrations',
  },
  datasource: {
    url: databaseUrl,
  },
})
