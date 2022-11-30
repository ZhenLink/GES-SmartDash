const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    res.render('payments', {title: 'GES | Payments'});
});

module.exports = router