import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Catálogo de Brinquedos API',
      version: '1.0.0',
      description: 'API para gerenciamento de catálogo de brinquedos',
      contact: {
        name: 'Suporte',
        email: 'suporte@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3002',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js'], // Arquivos que contêm anotações do Swagger
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
