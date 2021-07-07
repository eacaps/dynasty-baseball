import express from 'express';
import bodyParser from 'body-parser';
import {startServer,createConfiguration} from 'snowpack';
import api from './api.js';
import path from 'path';
import minimist from 'minimist';
import snowpackConfig from '../snowpack.config.js';

const config = createConfiguration(snowpackConfig);
console.log(snowpackConfig)

export default async function server () {
    let devServer;
    const args = minimist(process.argv.slice(2));
    console.log(`args:${JSON.stringify(args)}`);
    if(args.dev) {
        devServer = await startServer({config});
    }
    
    const app = express();
    const PORT = process.env.PORT = 8080;

    app.use(express.json());

    app.use('/api', api);

    if(devServer) {
        app.use(async (req, res, next) => {
            try {
                const buildResult = await devServer.loadUrl(req.url);
                console.log(buildResult);
                res.setHeader("content-type", buildResult.contentType);
                res.send(buildResult.contents);
            } catch (err) {
                next(err);
            }
        });
    } else {
        app.use(express.static(path.join(process.cwd(), 'dist')));
    }

    app.listen(PORT, () => {
        console.log('Server is running at:',PORT);
    });

    return app;
}

server();