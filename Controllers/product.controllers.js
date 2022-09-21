
const {Product} = require("../models");

exports.create=(req,res)=>{

    const {name,description,cost,categoryId}=req.body;


    if(!name){
        res.status(400).send({message:"Name of the product cannot be empty"});
    }

    const product = {
        name,
        description,
        cost,
        categoryId
    };
    
    Product.create(product)
    .then(product=>{
        res.status(201).send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

exports.findAll = (req,res)=>{

    Product.findAll()
    .then(products=>{
        res.send(products)
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}

exports.findOne=(req,res)=>{

    const productId=req.params.id;

    Product.findByPk(productId)
    .then(product =>{
        
        if(!product){
            res.status(404).send({message:"Product not found"});
        }
        res.send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:err.message || "Something went wrong"});
    })
}