const { Sequelize } = require("sequelize");

module.exports = (Sequelize, sequalize)=>{

    const Cart= sequalize.define("cart",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cost:{
            type:Sequelize.INTEGER
        }
    })

    return Cart;
}