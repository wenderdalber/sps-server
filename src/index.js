const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

app.use(cors());
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SPS Group API",
      version: "1.0.0",
      description: "API de gerenciamento de usuários",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/routes.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Docs em http://localhost:3000/docs");
});