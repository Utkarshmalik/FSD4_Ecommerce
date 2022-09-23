
const {Product,Category} = require("../models");

exports.create=(req,res)=>{

    const {name,description,cost,categoryId}=req.body;
    const product = {name,description,cost,categoryId};

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

exports.findProductsUnderCategory=(req,res)=>{

    Product.findAll({
        where:{
        categoryId:req.params.categoryId
        }
    })
    .then(products=>{
        res.send(products);
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong while getting products for given categroy Id"});
    }) 
}

exports.findProductUnderCategory=(req,res)=>{

    Product.findAll({
        where:{
        categoryId:req.params.categoryId,
        id:req.params.productId
        }
    })
    .then(product=>{
        res.send(product);
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong while getting products for given categroy Id"});
    })

}