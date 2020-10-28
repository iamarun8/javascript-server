import * as express from 'express';
class Server {
    app
    constructor(private config)
    {
        this.app = express()
    }

    bootstrap(){
        this.setupRoutes;
        return this;
    }

    setupRoutes(){
        const { app } = this;
        console.log(app);
        app.get('/health-check', (req, res, next) => {
            res.send('I am OK');
        });
        return this;
    }

    run(){
        const { app, config: { PORT } } = this;
        console.log("port",PORT);
        app.listen(PORT, (err) => {
            if(err){
                console.log(err);
            }
            console.log('App is Running on',PORT);
        })
    }
}

export default Server;