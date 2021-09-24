const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //Express server running on port 5000, while React runs on 3000

const http = require('http'); //might not need

console.log("Starting server!")



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/express_backend', (req, res) => { 
    res.send({ express: 'Express backend is connected to react!' }); 
});

app.get('/image_arr', (req, res) => {
    res.send({ test: "test"})
})

// const server = app.listen(process.env.PORT || 5000, () => {
//     console.log(`Express running → PORT ${server.address().port}`);
// });
app.listen(port, () => console.log(`Listening on port ${port}`));