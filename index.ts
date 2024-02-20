import express, { Application } from 'express';
import { controllers } from "./src/controllers";
import cors from 'cors';
import { db } from './config';
import 'dotenv/config';

const PORT = parseInt(<string>process.env.PORT);

(async () => {
    
    const app: Application = express();
    
    await db();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    controllers.forEach(controller => {
        app.use(controller.router);
    });

    app.listen(PORT, () => {
        //console.clear();
        console.log(`🚀 Server Running @ Port ${PORT} ⚡`);
    });

})();

