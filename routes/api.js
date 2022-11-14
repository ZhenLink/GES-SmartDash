const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const Assessment = require('../models/assessment');
const router = express.Router();
const axios = require('axios');


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


//categoriess = ["Lighting", "Electronics", "House Accessories"];

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



module.exports = router