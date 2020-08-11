const server = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

server.createServer((req,res) => {
 const filePath = path.join(__dirname,'public', req.url === '/' ? 'index.html' : req.url);

 const extName = path.extname(filePath);

 let contentType = 'text/html';

 switch(extName){
    case '.css':
      contentType = 'text/css';
    break;
    case '.js':
      contentType = 'text/js';
    break;
    case '.json':
       contentType = 'Application/json';
    break;
    case '.png':
       contentType = 'image/png';
    break;
    case '.jpg':
       contentType = 'image/jpg';
    break;
 }

 fs.readFile(filePath,(err,content) => {
    if(err){
       if(err.code === 'ENOENT'){
         //  error 404
         fs.readFile(path.join(__dirname,'public','404.html'),(err,content) =>{
            res.writeHead(200,{'Content-Type':'text/html'});

            res.end(content,'utf8');
         })
       }else{
         //  server error
         res.writeHead(500);

         res.end(`server error ${err.code}`);
       }
    }else{
      //  success
      res.writeHead(200,{'Content-Type':contentType});

      res.end(content,'utf8')
    }
 })
}).listen(PORT,console.log(`server running on port ${PORT}`));