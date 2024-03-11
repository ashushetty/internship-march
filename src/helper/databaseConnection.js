import { Sequelize  } from "sequelize";

let connection =null;

const getConnection =() =>{
    if(!connection){
        connection= new Sequelize({
            database:process.env.DATABASE,
            host: process.env.DBHOST,
            username:process.env.DBUSER,
            password:process.env.DBPASSWORD,
            port:process.env.DBPORT,
            dialect:"postgres",
            pool:{
                max:5,
                min:0,
                idle:20000,
                acquire:20000

            },
            logging:false
        });
        connection
        .authenticate()
        .then(()=>console.log("database connected succesfully"))
        .catch((err)=>console.log("Database failed to connect",err.message));
    }
return connection;
};


export default getConnection;