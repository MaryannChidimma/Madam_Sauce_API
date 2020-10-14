const express = require('express');
const  mongoose = require('mongoose');
const router = express.Router(); 
const Menu = require('../models/foodMenu');

router.post('/', (req, res)=>{
const menu = new Menu({
 food_id : req.body.food_id,
 name : req.body.name,
 price: req.body.price,
 quantity: req.body.quantity
})
food.save().then(result=>{
    console.log(result)
   })
   .catch(err => console.log(err));
   res.status(201).json({
    message: 'this handles post request in /kitchen',
    createdProperty: menu
});

//res.json({message: 'post request'});
});

router.get('/', (req, res) =>{
    Menu.find()
    .select("name price _id")
    .exec()
    .then(doc =>{
    const response = {count :doc.length, Menu: doc}
    if(doc.length >= 0){
    res.status(200).json({doc})
     } else{
      res.status(404).json({message: 'No entries found'})
     }
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
res.status(200).json({doc})
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
    res.status(200).json({result})
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
        res.status(200).json({result})
       })
       .catch(err =>{
       console.log(err)
       res.status(500).json({error: err})
       });
    });

module.exports = router;