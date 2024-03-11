import { Router } from "express";
import initProductData from "../models/productModel.js";
import constants from "../config/constants.js";
import { send } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router= Router();
import { Op } from "sequelize";

router.delete('/:id', async (req, res) =>{
    try{
        const product_id=req.params.id
        const productModel= await initProductData()
        const isValidId= await productModel.findOne({
            where:{
                product_id:product_id,
                isactive: constants.STATE.ACTIVE,
            },
        });
        if(isValidId){
            await isValidId.update({
                isactive:constants.STATE.INACTIVE,
                where:{
                    product_id: product_id,
                },
            });
            return send (res, RESPONSE.SUCCESS);
        }
        else{
            return send(res, RESPONSE.INVALID_ID);
        }

    }catch(err){
        console.log(err);
    }
})

export default router;