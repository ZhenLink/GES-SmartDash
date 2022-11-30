require('dotenv').config();
const express = require("express");
const { engine } = require("express-handlebars");
const path = require('path');
const mongoose = require('mongoose');


//init Express app
const app = express();


//mongoDB connection
const mongoDB = mongoose.connection
mongoDB.once('open', () =>
      console.log('Connected to mongoDB server..'));

async function databaseConnection(databaseURI){
  try {
    await mongoose.connect(databaseURI, {useNewUrlParser: true });

  } catch (error) {
      console.log(error);
  }
}

//init DB Connection 
databaseConnection(process.env.DATABASE_URL);



//JSON server Parsing
app.use(express.json());

//application routes
const index = require('./routes/index');
const assessment = require('./routes/assessment');
const payment = require('./routes/payment');
const clients = require('./routes/clients');
const reports = require('./routes/reports');
const emonitor = require('./routes/emonitor');
const apiRouter = require('./routes/api');
const { on } = require('nodemon');


//loading API routes
app.use('/api', apiRouter);

//loading dashboard routes
app.use('/assessment', assessment);
app.use('/payment', payment);
app.use('/clients', clients);
app.use('/reports',reports);
app.use('/emonitor', emonitor);


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