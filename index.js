import express from "express";
import dotenv from "dotenv";
import getConnection from "./src/helper/databaseConnection.js";
import router from "./routes.js";
import path from "path";
const _dirname = path.resolve();

// const path= require("path");
// const fs= require( "fs" );
// const filepath=path.join(process.cwd(),"demo.txt");
// fs.writeFileSync(filepath,"I am learning nodejs");
// const readFile = fs.readFileSync(filepath).toString();
// console.log(readFile);

// const a=require("./app");

// console.log();

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

// app.get("/api/demo",(req,res) =>{
//     return res.status(200).send("This is my first api")
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));
router(app);
getConnection();

app.listen(PORT, () => {
  console.log(`server is runnning on port ${PORT}`);
});
