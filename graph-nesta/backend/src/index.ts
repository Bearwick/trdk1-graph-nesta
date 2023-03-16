import express from 'express'
import config from './config'
import initialRoutes from './routes/ontology'

const app = express()

app.use('/ontology', initialRoutes)
app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}`)
})
