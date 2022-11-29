const express = require('express');
const router = express.Router();

router.get('/assessment', (req, res) =>{
    res.render('assessments', {title: 'GES | Assessment'});
});

module.exports = router