const express = require('express');
const router = express.Router();
const axios = require('axios');

//base assessment link
router.get('/', (req, res) =>{

    axios.get('http://localhost:5000/api/appliance').then((response)=> {

       // let completedassessments = [];
        //response.data.map((assessments) =>{
          //  completedassessments.push(assessments);
        ///});
        res.render('assessments', {title: 'GES | Assessment', assessment: response.data});

    }).catch((err)=>{
        console.log(err);
    });
    
});
async function CalculateApplianceLoad(req, res, next) {
    let device;
    try {
        device = await Emonitor.find({
            DeviceID: req.params.id
        });
        if (device == null) {
            return res.status(404).json({message: 'Cannot find that device'});
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }

    res.device = device;
    next();
}

module.exports = router