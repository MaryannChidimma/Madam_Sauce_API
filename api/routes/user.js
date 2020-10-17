const mongoose = require('mongoose')
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');

router.post('/signup', (req, res, next)=>{
    user.find({email: req.body.email})
    .then(user =>{
        if(user.length >=1){
            return res.status(422).json({message :'email exists'})
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if(err){
           return res.status(500).json({error : err});
                
                 } else{
           
            const user = new User({
                _id :mongoose.Types.ObjectId(),
                email :req.body.email,
                password : hash
         })
         user.save()
         .then(result =>{
        console.log(result)
        res.status(201).json({message: 'user created sucessfully'});
         })
         .catch(err=>{
             res.status(500).json({error:err})
         });
         
            }
        })
        
        }
    })
    
    
});
//check if a certain user is in the database, then creat a token 
router.post('/login', (req, res, next)=>{
    user.find({email: req.body.email})
    .exec()
    .then(user =>{
     if(!user.length >1){
         return res.status(401).json({message : "Authentication field"})
     }
     bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
         if(err){
            return res.status(401).json({message : "Authentication field"})   
         }
         if(result){
             token = jwt.sign({
                email: user[0].email, 
                user_Id: user[0]._Id
                },
                process.env.JWT_KEY,
               {expiresIn : '1h'}
             )
            return res.status(200).json({message : "Authentication successful", tokens: token })  
         }
         return res.status(401).json({message : "Authentication field"})
        })
    
    })
    .catch(err=>{ 
        res.status(500).json({error: err});
    })

})

router.delete('/:userId', (req, res, next)=>{
   user.remove({_id: req.params.userId})
   .exec()
   .then(result =>{
       res.status(200).json({message :" user deleted  successfully"})
   })
   .catch(err=>{ 
       res.status(500).json({error: err});
   })
})

module.exports = router;