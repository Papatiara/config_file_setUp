const fs = require('fs');
var express = require('express'); 
const app = express();
var cors = require('cors');
app.use(cors());

const port = 4000;

app.get('/file', (req, res, next) => {

    fs.readFile('./config/config.txt', function read(err, data) {
        if (err) {
            throw err;
        }
        const content = data;
        processFile(content);   
    });
    const processFile = (content) => {
        let blob = content.toString();
        const regexAll = /(^[^#\n]*)\w+/gm;
        const regexSpace = /\s/gi;
        const regexQuotes = /\"/gi;
        const match = blob.match(regexAll);
        const obj = {};
        for (let i = 0; i < match.length; i++) {
          var clean = match[i].replace(regexSpace,'').replace(regexQuotes,'');
          var pre = clean.split('=');
          if (pre[1] === "on" || pre[1] === "yes") {
            obj[pre[0]] = "true";
          } 
         else if (pre[1] === "off" || pre[1] === "no") {
            obj[pre[0]] = "false";
        } else {
          obj[pre[0]] = pre[1];
        }
      }
      const str = JSON.stringify(obj)
    res.end(str);
    }
    });

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
      })