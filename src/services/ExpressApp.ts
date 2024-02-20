import express, { Application } from 'express';
import swaggerjsdoc from 'swagger-jsdoc';
import swaggerui from 'swagger-ui-express';
import routes from '../routes';
import cors from 'cors';

export default async(app: Application) => {

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/mui-project-service/api/v1', routes);

    return app;
}




