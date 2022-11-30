const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('reports', {title: 'GES | Reports'});
});

module.exports = router