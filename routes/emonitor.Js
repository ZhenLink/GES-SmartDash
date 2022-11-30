const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('emonitor', {title: 'GES | E-Monitor'});
});

module.exports = router