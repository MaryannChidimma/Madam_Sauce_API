const Order = require('../models/orderSchema');
const Menu = require('../models/menuSchema')
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) =>{
    Order.find()
    .select("foodId quantity _id")
    .exec()
    .then(docs=>{
        console.log(docs);
     const response = {
     count :docs.length, 
      orders: docs.map(doc=>{
          return{
         foodId: doc.foodId,
         _id  : doc._id,
         quantity: doc.quantity,
         request :{type: 'GET', url: 'http://localhost:5000/order/' + doc._id} 
          }
      })
    }

    res.status(200).json({response})

})
    .catch(err => {console.log(err)
        res.status(201).json({error: err})
    });
}
  
exports.order_create_orders = (req, res, next) =>{
    Menu.findById(req.body.foodId)
    .then( food =>{
        if(!food){
            return res.status(404).json({message: "Food not found"})
        }
        const order  = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            foodId: req.body.foodId
        });
        return order
        .save().then(result=>{
            console.log(result);
            res.status(201).json({
                message: 'order was created',
                createdProperty: {
                    _id : result._id,
                    foodId: result.foodId,
                    quantity: result.quantity,
                    request :{
                        type :"GET",
                        url:"http://localhost:5000/order/" + result._id
                    }
               }
           })
        })
    })
    
    .catch(err=>{
        console.log(err);
        res.status(500).json({error: err});
        });
}

exports.order_get_order = (req, res, next)=>{
    const id = req.params.orderId;
    Order.findById(id)
    .exec()
    .then(order =>{
        if(!order){
            return res.status(404).json({message: "order not found"});
        }
        console.log(order)
    res.status(200).json({
        Order: order,
        request:{
            type : 'GET',
            description: 'GET_ALL_ORDER',
            url : "http://localhost:5000/order" 
        }
    })
    })
    .catch(err =>{console.log(err)
    res.status(500).json({error:err})
    });
     
}

exports.order_delete_order = (req, res, next) => {
   
        const id = req.params.orderId;
        Order.remove({_id : id})
        .exec()
        .then(result => {
         console.log(result)
         res.status(200).json({
         message : "order deleted",
         request: {
          type:"POST",
          url : "http://localhost:5000/order" ,
          body: {foodId: "ID", quantity: "Number"}
         }
         })
        })
        .catch(err =>{
        console.log(err)
        res.status(500).json({error: err})
        });
}