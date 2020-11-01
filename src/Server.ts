import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes'
import { IConfig } from './config/IConfig';

class Server {
    app
    constructor(private config: IConfig)
    {
        this.app = express()
    }

    bootstrap(){
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public setupRoutes() {
        this.app.use((req, res, next) => {
            console.log(req.body);
            next()
        })

        this.app.use('/health-check', (req, res, next) => {
            console.log("Inside Second Middleware")
            res.send('I am OK');
        });

        this.app.use(notFoundHandler);
        
        this.app.use(errorHandler);
    }

    public initBodyParser() {
        this.app.use(bodyParser.json());
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