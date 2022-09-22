const { request } = require("express");
const express = require("express");
const { engine } = require("express-handlebars");
const path = require('path');



const app = express();

//loading routes
const index = require('./routes/index');


//setting up static folder
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.engine('hbs', engine(({
  layoutsDir: __dirname + '/views/layouts', 
  extname:'hbs'
})));

app.get('/money/id:',(req, res)=>{
  res.send('Received a get request for money endpoint');
});

app.post('/users')
//configured routes
app.use('/', index);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>
    console.log( `Server listening on PORT ${PORT}`)
);