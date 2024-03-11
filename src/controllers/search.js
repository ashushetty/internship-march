import { Router } from "express";
import initProductData from "../models/productModel.js";
import constants from "../config/constants.js";
import { send } from "../helper/responsehelper.js";
import RESPONSE from "../config/global.js";
const router= Router();
import { Op } from "sequelize";

router.get("/:key?", async( req,res)=> {
    try{
        //  let searchKey = 

        
          const productModel = await initProductData();

          let data= await productModel.findAll({
             where:{
                isactive: constants.STATE.ACTIVE,
                product_name:{[Op.iLike]: "%" + req.params.key + "%"},
             },
          });
          
          
    data = data.map((item) => {
        return {
          product_id: item.product_id,
          product_name: item.product_name,
          price: item.price,
          image: "/products/" + item.image,
        };
      });
  
      
      if(data.length==0){
        return send(res,RESPONSE.NO_DATA);
      }
      return send(res, RESPONSE.SUCCESS, data);
    } catch (err) {
      console.log(err);
    }
  });
          
export default router;