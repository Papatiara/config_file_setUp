const fs = require('fs');
var express = require('express'); 
const app = express();
var cors = require('cors');
app.use(cors()) 

const port = 4000;

app.get('/file', (req, res, next) => {

    fs.readFile('./config.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data;
        processFile(content);   
    });
    const processFile = (content) => {
        res.end(content);
    }
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })