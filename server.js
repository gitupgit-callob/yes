const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res) => {
    const url = req.url.slice(1); // Remove leading slash
    const method = req.method.toLowerCase();
    const options = {
        url: `http://${url}`,
        method: method,
        headers: req.headers,
        body: req.body,
        json: true,
    };

    request(options, (error, response, body) => {
        if (error) return res.status(500).send(error);
        res.status(response.statusCode).send(body);
    });
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
