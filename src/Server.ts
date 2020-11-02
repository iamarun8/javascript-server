import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import { IConfig } from './config/IConfig';
import route from './router';

class Server {
    app
    constructor(private config: IConfig )
    {
        this.app = express();
    }
    public initBodyParser() {
        this.app.use(bodyParser.json());
    }

    bootstrap(){
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public setupRoutes() {
       
        this.app.use('/health-check', (req, res, next) => {
            console.log("Inside Second Middleware")
            res.send('I am OK');
            next()
        });

        this.app.use('/api', route);

        this.app.use(notFoundHandler);
        
        this.app.use(errorHandler);
        return this;
    }

    run(){
        const { app, config: { PORT } } = this;
        app.listen(PORT, (err) => {
            if(err){
                console.log(err);
            }
            console.log('App is Running on',PORT);
        })
    }
}

export default Server;