import dotenv from 'dotenv'

dotenv.config({
  path: '.env'
})

const PORT = process.env.PORT ?? 3000

export default {
  PORT,
  GRAPHDB_BASE_URL: process.env.GRAPHDB_BASE_URL,
  GRAPHDB_REPOSITORY: process.env.GRAPHDB_REPOSITORY,
}
