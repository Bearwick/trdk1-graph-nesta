import express from 'express'
import config from './config'
import initialRoutes from './routes/ontology'
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "REST API for Swagger Documentation",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: "http://localhost:8080/" }],
  },
  apis: [
    "./src/routes/ontology.ts",
  ],
};
const swaggerSpec = swaggerJSDoc(options);

const app = express()
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/ontology', initialRoutes)
app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}`)
})
