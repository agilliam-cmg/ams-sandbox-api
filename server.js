const express = require('express');
const gitHubService = require('./gitHubService');

const port = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) =>{
    let now = new Date().toString();
    let log = `${now}:  ${req.method} ${req.url}`;

    console.log(log);
    next();
});

app.get('/config-file/:name([\\w\\d\\+\\-\\/\\.]+json)', async (req, res) => {
    try {
        console.log('Getting config file: ', req.params.name);
        const file = await gitHubService.getConfigFile(req.params.name);
        res
            .header('Content-Type', 'application/json')
            .status(200)
            .send(file);
    } catch(err) {
        console.log(
            `Could not handle request ${req.path}\n\r${err}`
        )
    }
});

app.listen(port, () => {
    console.log('Node app started on port: ', port)
});