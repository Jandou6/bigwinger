const path = require('path');
const http = require('http');
const express = require('express');
const app = express();
const PORT = '7100';

app.use(express.static(path.resolve(__dirname,'../dist')));

var server = http.createServer(app);

app.get('*',(request,response)=>{
  response.sendFile(path.resolve(__dirname,'../dist/index.html'))
})
server.listen(PORT, function() {
  console.log("Listening on http://127.0.0.1:%j", server.address().port);
});