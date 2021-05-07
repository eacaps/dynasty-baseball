const express = require('express');

const {startServer,createConfiguration } = require('snowpack');
const snowpackConfig = require("../snowpack.config.js");
const config = createConfiguration(snowpackConfig);
console.log(snowpackConfig)

async function run () {
    const server = await startServer({config});
    
const app = express();
const PORT = process.env.PORT = 3000;

// app.use(express.static('.'));

app.use(async (req, res, next) => {
    try {
        const buildResult = await server.loadUrl(req.url);
        console.log(buildResult);
        res.setHeader("content-type", buildResult.contentType);
        res.send(buildResult.contents);
    } catch (err) {
        next(err);
    }
});

app.listen(PORT, () => {
  console.log('Server is running at:',PORT);
});
}

run();