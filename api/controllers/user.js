const mongoose = require('mongoose')
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.user_signup = (req, res,next)=>{
    User.find({email: req.body.email})
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
        res.status(201).json({message: 'user created sucessfully', user : result});
         })
         .catch(err=>{
             res.status(500).json({error:err})
         });
         
            }
        })
        
        }
    })
    
}

exports.user_login =(req, res, next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
     if(user.length < 1){
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
            return res.status(200).json({message : "Authentication successful", token: token })  
         }
         return res.status(401).json({message : "Authentication field"})
        })
    
    })
    .catch(err=>{ 
        res.status(500).json({error: err});
    })

}

exports.user_delete_user = (req, res, next)=>{
    User.remove({_id: req.params.userId})
    .exec()
    .then(result =>{
        res.status(200).json({message :" user deleted  successfully"})
    })
    .catch(err=>{ 
        res.status(500).json({error: err});
    })
}