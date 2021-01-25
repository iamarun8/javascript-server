import * as express from 'express';
import * as bodyParser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import { IConfig } from './config/IConfig';
import route from './router';
import Database from './libs/Database';
import * as swagger_ui_express from 'swagger-ui-express';
import * as swagger_doc from 'swagger-jsdoc';
import * as cors from 'cors';

class Server {
    app
    constructor(private config: IConfig) {
        this.app = express();
    }
    public initBodyParser() {
        this.app.use(bodyParser.json());
    }

    bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    swagger = () => {
        const options = {
            definition: {
                info: {
                    title: 'JavaScript Server Training',
                    version: '1.0.0',
                    description: "This is a sample server",
                      
                },
                securityDefinitions: {
                    Bearer: {
                        type: 'apiKey',
                        name: 'Authorization',
                        in: 'headers'
                    }
                }
            },
            basePath: '/api',
            swagger: '4.1',
            apis: ['./src/controllers/**/routes.ts'],
        };
        const swagdoc = swagger_doc(options);
        return swagdoc;
    }

    public setupRoutes() {
        this.app.use(cors());
        this.app.use('/swagger', swagger_ui_express.serve, swagger_ui_express.setup(this.swagger()));
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

    run() {
        const { app, config: { PORT, MONGO_URL } } = this;
        Database.open(MONGO_URL)
            .then((res) => {
                console.log('Successfully Connected to Mongo');
                app.listen(PORT, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    console.log('App is Running on', PORT);
                })
            })
            .catch(err => console.log(err));
    }
}

export default Server;