const express = require('express');
const router = express.Router();
const axios = require('axios');

//base assessment link
router.get('/', (req, res) =>{

    axios.get('http://localhost:5000/api/appliance').then((response)=> {

        let completedassessments = [];
        response.data.map((assessments) =>{
            completedassessments.push(assessments);
        });
        res.render('assessments', {title: 'GES | Assessment', assessment: completedassessments});

    }).catch((err)=>{
        console.log(err);
    });
    
});

module.exports = router