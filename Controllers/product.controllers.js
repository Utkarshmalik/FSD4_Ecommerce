
const {Product,Category,Sequelize} = require("../models");
const Op= Sequelize.Op;

exports.create=(req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }

    const {name,description,cost,categoryId}=req.body;

    const product = {name,description,cost,categoryId};

    Product.create(product).then(product=>{
        return res.status(201).send(product);
    })
    .catch((err)=>{
        console.log("inside catch")
        return res.status(500).send({message:err.message || "Something went wrong"});
    })
}

// GET localhost:8080/ecomm/api/v1/products?minCost=80000
// GET localhost:8080/ecomm/api/v1/products?maxCost=80000
// GET localhost:8080/ecomm/api/v1/products?minCost=60000&maxCost=80000

exports.findAll = (req,res)=>{

    const {name,minCost,maxCost,page,size} = req.query;

    const limit = size?parseInt(size):15;
    const offset= page?page*limit:0; 

    console.log(limit);
    console.log(offset);


    if(name){
        productsPromise=Product.findAll({
            where:{
                name:name
            },
            limit:limit,
            offset:offset
        })    
    }
    else if(minCost && maxCost){

        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost,
                [Op.lte]:maxCost
            }},
            limit:limit,
            offset:offset
        })
    }
    else if(minCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.gte]:minCost            
            }
        },
        limit:limit,
        offset:offset
        })

    }
    else if(maxCost){
        productsPromise=Product.findAll({
            where:{
            cost:{
                [Op.lte]:maxCost           
             }
        }, limit:limit,
        offset:offset
        })
    }
    else{
        productsPromise=Product.findAll({
            limit:limit,
            offset:offset
        });
    }
  
    productsPromise
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