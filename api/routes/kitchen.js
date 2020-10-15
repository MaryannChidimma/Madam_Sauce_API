const express = require('express');
const  mongoose = require('mongoose');
const { request } = require('../../app');
const router = express.Router(); 
const Menu = require('../models/foodMenu');

router.post('/', (req, res)=>{
const menu = new Menu({
 category : req.body.category,
 name : req.body.name,
 price: req.body.price,
 quantity: req.body.quantity
});
menu.save().then(result=>{
    console.log(result);
    res.status(201).json({
        message: 'this handles post request in /product',
        createdProperty: {
            name: result.name,
            price: result.price,
           // _id = result._id,
            request :{
                type :"GET",
                url:"http://localhost:5000/kitchen/" + result._id
            }

        }
   })
})
   .catch(err =>{
     console.log(err);
   res.status(500).json({error: err});
   });
   
//res.json({message: 'post request'});
});

router.get('/', (req, res) =>{
    Menu.find()
    .select("name price _id")
    .exec()
    .then(docs=>{
        console.log(docs);
     const response = {
     count :docs.length, 
      menus: docs.map(doc=>{
          return{
         name: doc.name,
         price: doc.price,
         _id  : doc._id,
         request :{type: 'GET', url: 'http://localhost:5000/kitchen/' + doc._id} 
          }
      })
    }
    //if(doc.length >= 0){
    res.status(200).json({response})
    // } else{
   //   res.status(404).json({message: 'No entries found'})
   //  }
})
    .catch(err => {console.log(err)
        res.status(201).json({error: err})
    })
    
});

router.get('/:foodId', (req, res) =>{
const id = req.params.foodId;
Menu.findById(id)
.exec()
.then(doc =>{console.log(doc)
res.status(200).json({
    menu: doc,
    request:{
        type : 'GET',
        description: 'GET_ALL_MENU',
        url : "http://localhost:5000/kitchen" 
    }
})
})
.catch(err =>{console.log(err)
res.status(500).json({error:err})
})
});

router.patch('/:foodId', (req, res) =>{
    const id = req.params.foodId;
    const updateOps = {};
    for(const ops of req.body){
    updateOps[ops.propName] = ops.value
    }
    Menu.update({_id:id},{$set:updateOps })
    .exec()
    .then(result =>{console.log(result)
    res.status(200).json({
    message: 'Updated Menu',
    request:{
        type: "GET",
        url: "http://localhost:5000/kitchen/"+ id  
      }
    })
    })
    .catch(err =>{console.log(err)
    res.status(500).json({error:err})
    })
    });

    router.delete('/:foodId', (req, res) =>{
        const id = req.params.foodId;
       Menu.remove({_id : id})
       .exec()
       .then(result => {
        console.log(result)
        res.status(200).json({
        message : "menu deleted",
        request: {
         type:"POST",
         url : "http://localhost:5000/kitchen" ,
         body: {name: "String", price: "Number"}
        }
        })
       })
       .catch(err =>{
       console.log(err)
       res.status(500).json({error: err})
       });
    });

module.exports = router;