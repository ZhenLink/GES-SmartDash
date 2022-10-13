const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {title: 'GES | Welcome'});
    //res.send('Welcome to the initial route');
    
});

module.exports = router