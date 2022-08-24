const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {title: 'GES | Welcome'});
    res
});

module.exports = router