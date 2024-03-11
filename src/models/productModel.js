import getConnection from "../helper/databaseConnection.js";
import {DataTypes} from "sequelize";
const productModel ={
    product_id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,  
    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    image:{
        data:Buffer,
        type:DataTypes.STRING,
        allowNull:true,
    },
    isactive:{
        type:DataTypes.INTEGER,
        defaultValue: 1,

    },
};

let product = null;
 
const initProductData = async()=>{
    try{
        if(product) return product;
        let sequelize = await getConnection();
        product= sequelize.define("products",productModel,{
            freezeTableName: true,
        });
        await product.sync({alter:true}); 
        return product;

}catch(err){
    console.log(err.stack);
}
};

export default initProductData;
