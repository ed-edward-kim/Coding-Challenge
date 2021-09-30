const express = require('express');
const app = express();
const port = process.env.PORT || 5000; //Express server running on port 5000, while React runs on 3000
const bp = require('body-parser'); //body parser for dealing with req.body. Need for dealing with arrays
const http = require('http'); //might not need
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args)); //node-fetch ESM only module, so we use this to load fetch.
const fs = require('fs');

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
    // console.log("url: ", req.params.urls)
    // // console.log("body: ", req.params.urls)
    // console.log("query array", JSON.stringify(req.query.array))
    // // res.send({ test: req.params.urls})
    // console.log("hmm: ", req.body)

    // console.log(req.body)

    // var zip = new JSZip();
    // var count = 0;
    // var zipFileName = "test.zip";
    // var urls = req.body;
    // console.log("1");

    // urls.forEach(url =>{ //url will hold a url from array.
    //     var filename = "test"; //load file and add it to a zip file
    //     console.log("2");
    //     try{
    //         JSZipUtils.getBinaryContent(url, (err, data) => {
                
    //             zip.file(filename, data, {binary:true});
    //             count++;
        
    //             if (count == urls.length){
    //                 var zipFile = zip.generateAsync({type: "blob"});
    //                 saveAs(zipFile, zipFileName);
    //             }    
    //         });
    //     } catch(err){
    //         console.log("Error, could not download image from " + url[count])
    //     }

    // });
    
    
    // console.log("test:", urls);

    //https://i.imgur.com/zt7smR4_d.webp?maxwidth=760&fidelity=grand, https://i.imgur.com/AD3MbBi_d.webp?maxwidth=760&fidelity=grand

    var count = 0; //for naming the images.
    try{
        const urls = req.body; //set const urls equal to the array of urls sent from React
        urls.map(file => {
            fetch(file)
                .then(res => {
                    console.log("file"+count+" = ", file);
                    res.body.pipe(fs.createWriteStream('./zip/image' + count + ".png"))
                    count++;
                })
                
        })
    } catch(err){ //I believe that this try/catch is not working properly, as it is not going to the catch when given a link with no image... Might be erroring at urls.map
        console.log("Error!");
        // return err;
    }

    
    res.send({express: "Test"})
})


app.listen(port, () => console.log(`Listening on port ${port}`));