

const db=require("../models");
const Category = db.Category;

exports.create = (req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }
    
    const category={
        name:req.body.name,
        description:req.body.description
    };

    Category.create(category)
    .then(category=>{
        console.log(`category with name ${category.name} created successfully`);
        res.status(201).send(category);
    })
    .catch((err)=>{
        res.status(500).semd({message:"Something went wrong"});
    })
}

exports.getAll = (req,res)=>{

    Category.findAll()
    .then((categories)=>{
        res.send(categories)
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong"});
    })
}

exports.getOne =(req,res)=>{

    const categoryId= req.params.id;


    Category.findByPk(categoryId)
    .then((category)=>{

        if(!category){
            res.status(400).send({message:`Category with id: ${categoryId} doesnot exists`});
        }

        res.send(category);
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong"});
    })

}


exports.update = (req,res)=>{

    if(!req.roles.includes('adtmin')){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }

    const categoryId= req.params.id;

    const {name,description} = req.body;

    const category={};

    if(name){
        category.name=name;
    }

    if(description){
        category.description=description;
    }

    Category.update(category,{
        where:{id:categoryId}
    })
    .then((updatedCategory)=>{
        res.send({message:`${updatedCategory[0]} records updated successfully}`});
    })
    .catch((err)=>{
        res.status(500).send({message:"Something went wrong"});
    })
}

exports.delete= (req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }

    const categoryId= req.params.id;

    Category.destroy({
        where:{
            id:categoryId
        }})
        .then((data)=>{
            res.send({message:"Successfully deleted the category"});
        })
        .catch((err)=>{
            res.status(500).send({message:"Something went wrong"});
        })
}