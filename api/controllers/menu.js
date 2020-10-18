const  mongoose = require('mongoose');
const Menu = require('../models/menuSchema');

exports.menu_get_all = (req, res, next)=>{
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
         request :{type: 'GET', url: 'http://localhost:5000/menu/' + doc._id} 
          }
      })
    }
    res.status(200).json({response})

  })
    .catch(err => {console.log(err)
        res.status(201).json({error: err})
    })
    }

exports.menu_get_menu = (req, res, next)=>{
     const id = req.params.foodId;
        Menu.findById(id)
        .exec()
        .then(doc =>{console.log(doc)
        res.status(200).json({
            menu: doc,
            request:{
                type : 'GET',
                description: 'GET_ALL_MENU',
                url : "http://localhost:5000/menu" 
            }
        })
        })
        .catch(err =>{console.log(err)
        res.status(500).json({error:err})
        }) ;  
}

exports.menu_create_menu = (req, res, next)=>{
    const menu = new Menu({
        _id : mongoose.Types.ObjectId(),
        category : req.body.category,
        name : req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
       });
       menu.save().then(result=>{
           console.log(result);
           res.status(201).json({
               message: 'this handles post request in /menu',
               createdProperty: {
                   name: result.name,
                   price: result.price,
                   quantity: result.quantity,
                   _id : result._id,
       
                   request :{
                       type :"GET",
                       url:"http://localhost:5000/menu/" + result._id
                   }
       
               }
          })
       })
          .catch(err =>{
            console.log(err);
          res.status(500).json({error: err});
          });       
}

exports.menu_patch_menu = (req, res, next)=>{
    const id = req.params.foodId;
    Menu.findById(id)
    .exec()
    .then(doc =>{console.log(doc)
    res.status(200).json({
        menu: doc,
        request:{
            type : 'GET',
            description: 'GET_ALL_MENU',
            url : "http://localhost:5000/menu" 
        }
    })
    })
    .catch(err =>{console.log(err)
    res.status(500).json({error:err})
    })
}

exports.menu_delete_menu =()=>{
    const id = req.params.foodId;
    Menu.remove({_id : id})
    .exec()
    .then(result => {
     console.log(result)
     res.status(200).json({
     message : "menu deleted",
     request: {
      type:"POST",
      url : "http://localhost:5000/menu" ,
      body: {name: "String", price: "Number"}
     }
     })
    })
    .catch(err =>{
    console.log(err)
    res.status(500).json({error: err})
    });  
}