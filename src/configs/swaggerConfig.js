const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'Ecommerce API Documentation',
      version: '1.0.0',
      description: 'Documentation for Ecommerce-API',
    },
    servers: [
      {
        url: "https://ecommerce-api-8iaf.onrender.com/",
      }, {
        url: "http://localhost:1500",
      }
    ]
  },
  // Provide the path to your API routes files
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;