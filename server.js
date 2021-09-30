const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //Express server running on port 5000, while React runs on 3000
const bp = require('body-parser'); //body parser for dealing with req.body. Need for dealing with arrays
const http = require('http'); //might not need
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); //node-fetch ESM only module, so we use this to load fetch.
const fs = require('fs');
const request = require('request');

const archiver = require('archiver');


app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

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

app.post('/image_arr/', (req, res) => {
    //https://i.imgur.com/zt7smR4_d.webp?maxwidth=760&fidelity=grand,https://i.imgur.com/AD3MbBi_d.webp?maxwidth=760&fidelity=grand
    //https://i.imgur.com/zt7smR4_d.webp,https://i.imgur.com/AD3MbBi_d.webp
    
    var count = 0;
    var urls_array = req.body.arr;
    var file_name = req.body.name;
    var archive = archiver('zip');

    const output = fs.createWriteStream(__dirname + '/' + file_name +'.zip'); //write to given filename

    for(var pic in urls_array){ //go through urls_array and append to archive
        archive.append(request(urls_array[pic]), {name: 'image'+ count + ".jpg"}); //appending file to archive from stream, and naming the image based on count
        count++;
    }
    archive.pipe(output); //pipe archive data to filename given
    archive.finalize();

    // var return_url = "/download/" + file_name;
    var return_url = "http://localhost:5000/download/" + file_name;
    res.send({link_to_zip: return_url})
})

app.get('/download/:output', (req, res) => { //using dynamic endpoint to help with getting zipfile location
    var zipfile = __dirname + "/" + req.params.output + ".zip"; //location and name of the zip to download
    res.download(zipfile);
})

app.listen(port, () => console.log(`Listening on port ${port}`));