const express = require('express');
const router = express.Router();

//base assessment link
router.get('/', (req, res) =>{
    res.render('assessments', {title: 'GES | Assessment'});
});

module.exports = router