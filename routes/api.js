const express = require('express');
const router = express.Router();


//<<<<<<User API Routes>>>>>>>>//

//getting all users
router.get('/user', (req, res) =>{
    res.send('Got all the users');
});

//getting a single user
router.get('/user/:id', (req, res) =>{
    
});

//creating a user
router.post('/user/', (req, res) =>{
    
});

//updating user
router.patch('/user/:id', (req, res) =>{
    
});

//deleting user
router.delete('/user/:id', (req, res) =>{
    
});

module.exports = router