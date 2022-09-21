

module.exports = (Sequelize,sequalize)=>{

    const Product = sequalize.define("product",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        },
        description:{
            type:Sequelize.STRING
        },
        cost:{
            type:Sequelize.INTEGER,
            allowNull:false
        },
        categoryId:{
            type:Sequelize.INTEGER
        }
    },{
        tableName:'products'
    });

    return Product;
}