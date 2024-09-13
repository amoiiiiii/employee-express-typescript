// src/types/swagger-jsdoc.d.ts
declare module 'swagger-jsdoc' {
    import { SwaggerDefinition } from 'swagger-jsdoc';
    const swaggerJsdoc: (options: SwaggerDefinition) => any;
    export default swaggerJsdoc;
  }
  
  // src/types/swagger-ui-express.d.ts
  declare module 'swagger-ui-express' {
    import { RequestHandler } from 'express';
    const swaggerUi: {
      serve: RequestHandler;
      setup: (specs: any) => RequestHandler;
    };
    export default swaggerUi;
  }
  