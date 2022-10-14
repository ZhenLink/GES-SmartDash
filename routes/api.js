const express = require('express');
const User = require('../models/user');
const router = express.Router();


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
    const user = new User({
        name: req.body.name,
        emailAddress: req.body.emailAddress,
        contactNumber: req.body.contactNumber,
        password: req.body.password,
        updatedDate: req.body.updatedDate
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

//updating user
router.patch('/user/:id', getUser, async (req, res) =>{

    if(req.body.name != null){
        res.user.name = req.body.name;
    }
    else{
        console.log("unsert")
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

module.exports = router