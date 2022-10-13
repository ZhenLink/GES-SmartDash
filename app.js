require('dotenv').config();
const express = require("express");
const { engine } = require("express-handlebars");
const path = require('path');
const mongoose = require('mongoose');


//init Express app
const app = express();


//mongoDB connection

async function databaseConnection(databaseURI){
  try {
    await mongoose.connect(databaseURI, {useNewUrlParser: true }).then(console.log('Connected to MongoDB cluster'));
  } catch (error) {
    console.log('Error: ' + error);
  }
}

//init DB Connection 
databaseConnection(process.env.DATABASE_URL);



//JSON server Parsing
app.use(express.json());


const index = require('./routes/index');
const apiRouter = require('./routes/api');


//loading API routes
app.use('/api', apiRouter);


//setting up static folder
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.engine('hbs', engine(({
  layoutsDir: __dirname + '/views/layouts',
  extname:'hbs'
})));


//configured routes
app.use('/', index);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>
    console.log( `Server listening on PORT ${PORT}`)
);