const express = require('express');
const app = express();
const PORT = 8080;


app.use('/index', express.static(__dirname + '/src'));

app.listen(PORT, ()=> {
  console.log(`Server is running on ${PORT}`)
});