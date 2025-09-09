import * as express from 'express';
import path = require('path');

interface Options {
    port: number;
    routes: express.Router;
    public_path?: string;
}

export class ServerExpress {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: express.Router;

    constructor(options: Options) {
        const { port, public_path = 'public', routes } = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start() {
        //Middleware
        //Trnaformar a un objeto json
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));//x-www-form-urlencoded


        //Public folder
        this.app.use(express.static(this.publicPath));

        //Routes
        this.app.use(this.routes);



        // SPA StaticViews WEB-SERVER
        this.app.get('{/*path}', (req,res) => {
            const indexPath = path.join( __dirname + `./../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        })
        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port} `);
        })
    }
}