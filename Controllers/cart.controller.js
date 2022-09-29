const {Cart ,Product, User} = require("../models");

exports.create=async (req,res)=>{

    if(!req.isAdmin){
        return res.status(403).send({message:"OOPS! you are unauthorized to perform this task"});
    }

    
    const userId=req.user.id;

    const user= await User.findByPk(userId);

    const cart= await Cart.create({userId:userId});

    res.send({message:"cart created successfully"});

}

exports.findCart= async (req,res)=>{

    const userId=req.user.id;

   const user= await User.findByPk(userId);

   const cart = await user.getCart();


   res.send(cart);

}