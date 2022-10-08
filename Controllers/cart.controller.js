const { where } = require("sequelize");
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

exports.update= async (req,res)=>{

    const userId=req.user.id;

    const user= await User.findByPk(userId);
 
    const cart = await user.getCart();

    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);
    
    const newProducts = await Product.findAll({where:{id:req.body.products}});

    if(!newProducts){
        res.status(400).send({message:"No product exists from the given product Id's"});
    }

    const existingproducts= await userCart.getProducts();

    const updatedProducts=[...existingproducts, ...newProducts];

    //calculate the updated cost 

    const totalCost = findTotalCost(updatedProducts);

    //update the cart model with totalCost 

    await Cart.update({cost:totalCost},{where:{
        id:cart.id
    }});

    await userCart.setProducts(updatedProducts);

    res.send(updatedProducts);
}





exports.findCart= async (req,res)=>{
    const {cart,products} = await findCartAndProducts(req.user.id);
    res.send({products,totalCost:cart.cost});
}


exports.deleteProductFromCart = async (req,res)=>{

    const productId=parseInt(req.params.id);

    const userId=req.user.id;

    const user= await User.findByPk(userId);
 
    const cart = await user.getCart();

    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);

    const existingproducts= await userCart.getProducts();

    const updatedProducts = existingproducts.filter((product)=>{
        return product.id!==productId;
    })

  //calculate the updated cost 

  const totalCost = findTotalCost(updatedProducts);

  //update the cart model with totalCost 

  await Cart.update({cost:totalCost},{where:{
      id:cart.id
  }});
  
    await userCart.setProducts(updatedProducts);

    res.send(updatedProducts);

}


const findCartAndProducts = async (userId)=>{

    const user= await User.findByPk(userId);
 
    const cart = await user.getCart();

    if(!cart){
        res.status(400).send({message:"No Cart associated with the user"});
    }

    const userCart = await Cart.findByPk(cart.id);

    const existingproducts= await userCart.getProducts();

    return  {cart:userCart,products:existingproducts};
}

const findTotalCost=(products)=>{
    let cost=0;
    for(let i=0;i<products.length;i++){
        cost+= products[i].cost;
    }
    return cost;
}