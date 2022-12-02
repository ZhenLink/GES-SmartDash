const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) =>{
    res.render('schedule', {title: 'GES | Schedule Intallation'});
    //res.send('Welcome to the initial route');
});

router.get('/scheduled', (req, res) =>{

  res.render('scheduled', {title: 'GES | Schedule Intallation'});
    
});


module.exports = router