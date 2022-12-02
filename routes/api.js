const express = require('express');
const User = require('../models/user');
const Payment = require('../models/payment');
const AssessmentsCompleted = require('../models/assessments');
const bcrypt = require('bcrypt');
const Assessment = require('../models/assessment_questions');
const Emonitor = require('../models/energy readings');
const router = express.Router();
const axios = require('axios');
const uuid =  require('uuid');
const ScheduledInstallations = require('../models/scheduled_installations');


//<<<<<<User API Routes>>>>>>>>//

//getting all users
router.get('/users', async (req, res) =>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message:  + error.message})
    }
});

//getting a single user
router.get('/user/:id', getUser, (req, res) =>{
    res.send(res.user);
});

//creating a user
router.post('/user/', async (req, res) =>{

    try{
        const hashPassword = await bcrypt.hash(req.body.password, 10); 
        const user = new User({
            name: req.body.name,
            emailAddress: req.body.emailAddress,
            contactNumber: req.body.contactNumber,
            password: hashPassword,
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    
    } catch(err){
        res.status(500).send();
    }
    
});

//updating user
router.patch('/user/:id', getUser, async (req, res) =>{

    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    if(req.body.emailAddress != null){
        res.user.emailAddress = req.body.emailAddress;
    }
    if(req.body.contactNumber != null){
        res.user.contactNumber = req.body.contactNumber;
    }
    if(req.body.password != null){
        res.user.password = req.body.password;
    }
    if(req.body.updatedDate != null){
        res.user.updatedDate = req.body.updatedDate;
    }
    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
});

//deleting user
router.delete('/user/:id', getUser, async (req, res) =>{
    try {
        await res.user.remove();
        res.json({message : 'Sucessfully deleted the user'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//authenticating users

router.post('/user/signin', AuthUser, async (req, res)=>{
    try { 
          if(await bcrypt.compare(req.body.password, res.user[0]['password'])){
              res.status(200).json({message: 'Credentials matched'});
            }
        else{

            res.status(404).json({message: 'Credentials do not match'});
        }
        
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
});


//user middleware
async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({message: 'Cannot find that user'});
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }

    res.user = user;
    next();
}

//user authentication middleware
async function AuthUser(req, res, next) {
    let user;
    try {
        user = await User.find({
            emailAddress: req.body.emailAddress
        });

        if(user.length == 0){
            res.status(400).send('cannot find user');
        }else{
            res.user = user;
            next();
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }

   
}

//<<<<<<Assessment API Routes>>>>>>>>//

//getting assessment Questions
router.get('/assessment/questions', async (req, res) =>{
    try {
        const assessment = await Assessment.find();
        res.json(assessment);
    } catch (error) {
        res.status(500).json({message:  + error.message})
    }
});

//inserting questions
router.post('/assessment/question', async (req, res) =>{

    try{
        const assessment = new Assessment({
            Question: req.body.Question,
            Category: req.body.Category,
        });

        const newAssessment = await assessment.save();
        res.status(201).json(newAssessment);
    
    } catch(err){
        res.status(500).send();
    }
    

});

//assessment Question finder middleware
async function GetQuestions(req, res, next) {
    let question;
    try {
        question = await Assessment.find({
            Category: req.body,
        });

        if(question.length == 0){
            res.status(400).send('cannot find questions of that category');
        }else{
            res.Assessment = question;
            next();
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }

   
}

//getting questions

router.post('/assessment/questions', GetQuestions, async (req, res)=>{
    try { 
        if(res.statusCode == 200){
            await res.json(res.Assessment);
        }
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
});


//getting completed Assessments

router.get('/appliance', async (req, res)=>{
    try {
        const completedassessments = await AssessmentsCompleted.find();
        res.json(completedassessments);
    } catch (error) {
        res.status(500).json({message:  + error.message})
    }
});

//adding assessments to the database

router.post('/appliance/assessments', async (req, res) =>{
    try{
        const completedAssessments = new AssessmentsCompleted ({
            Assessment: req.body.Assessment,
            User: req.body.User,
            Location: req.body.Location,
        });

        const newAssessment = await completedAssessments.save();
        res.status(201).json(newAssessment);

    
    } catch(err){
        res.json({message : err.message});
    }
});







//<<<<<<Payment API Routes>>>>>>>>//

router.post('/payment/payments', async (req, res) =>{
    try{
        const paymentRef = uuid.v4();
        const payment = new Payment({
            payment_Reference: paymentRef,
            Customer_Name: req.body.Customer_Name,
            Customer_Email: req.body.Customer_Email,
            Amount: req.body.Amount,
            Currency: req.body.Currency,
            Project_Number: req.body.Project_Number,
        });

        const newPayment = await payment.save();
        res.status(201).json(newPayment);
    
    } catch(err){
        res.json({message : err.message});
    }
});

//getting single payment user
router.get('/payment/:id', getPayment, (req, res) =>{
    res.send(res.payment);
});

//payment middleware
async function getPayment(req, res, next) {
    let payment;
    try {
        payment = await Payment.findById(req.params.id);
        if (payment == null) {
            return res.status(404).json({message: 'Cannot find that payment'});
        }
    } catch (error) {
        res.status(500).json({message : error.message});
    }

    res.payment = payment;
    next();
}




//<<<<<<Emonitor API Routes>>>>>>>>//

//inserting questions
router.post('/emonitor/readings', async (req, res) =>{

    try{
        const  emonitor = new Emonitor({
            DeviceID: req.body.DeviceID,
            Watts: req.body.Watts,
        });

        const newEmonitor = await emonitor.save();
        res.status(201).json(newEmonitor);
    
    } catch(err){
        res.status(500).send();
    }
    

});

//getting solar readings
router.get('/emonitor/readings/all', async (req, res) =>{
    try {
        const emonitor = await Emonitor.find();
        res.json(emonitor);
    } catch (error) {
        res.status(500).json({message:  + error.message})
    }
});

//getting a single user
router.get('/emonitor/readings/:id', getDeviceID, (req, res) =>{
    res.send(res.device);
});

//solar device middleware
async function getDeviceID(req, res, next) {
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

//sheduling installations
router.post('/installations/scheduled', async (req, res) =>{
    try{
        const scheduled = new ScheduledInstallations({
            Customer: req.body.name,
            ProjectID: req.body.project-number,
            Contact: req.body.contact,
            Date: req.body.installation-date,
            Message:req.body.message
        });

        const newScheduled = await scheduled.save();
        res.status(201).json(newScheduled);
    
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router