import { Router } from "express";
import initProductData from "../models/productModel.js";
import constants from "../config/constants.js";
import { send } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();

router.get("/:id", async (req, res) => {
  try {

    const product_id= req.params.id
    
         
    const productModel=await initProductData();








    let data = await productModel.findOne({
      where: { isactive: constants.STATE.ACTIVE ,
      product_id: product_id},
      attributes:["product_id","product_name","price","image"],
    });

    if(!data){
      return send(res,RESPONSE.NO_DATA);
    }

    let response={
        product_id: data.product_id,
        product_name:data.product_name,
        price: data.price,
        image:"/products/" + data.image,
    };

    
    
    return send(res, RESPONSE.SUCCESS, response);
  } catch (err) {
    console.log(err);
  }
});

export default router;
