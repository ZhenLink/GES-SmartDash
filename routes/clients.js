const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('clients', {title: 'GES | Clients'});
});

module.exports = router