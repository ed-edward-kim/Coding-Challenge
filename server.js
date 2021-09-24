const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //Express server running on port 5000, while React runs on 3000

const http = require('http'); //might not need

console.log("Starting server!")

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'Express backend is connected to react!' }) 
});

app.post('/image_arr/:urls', (req, res) => {
    console.log(req.params.urls)
    res.send({ test: req.params.urls})
})


app.listen(port, () => console.log(`Listening on port ${port}`));