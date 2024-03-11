import getConnection from "../helper/databaseConnection.js";
import {DataTypes} from "sequelize";
const userModel ={

    user_name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    isactive:{
        type:DataTypes.INTEGER,
        defaultValue: 1,

    },
};

let user = null;
 
const inituserData = async()=>{
    try{
        if(user) return user;
        let sequelize = await getConnection();
        user= sequelize.define("users",userModel,{
            freezeTableName: true,

        });
        await user.sync({alter:true}); 
        return user;

}catch(err){
    console.log(err.stack);
}
};

export default inituserData;
