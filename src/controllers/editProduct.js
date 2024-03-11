import { Router } from "express";
import initProductData from "../models/productModel.js";
import constants from "../config/constants.js";
import { send } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();
import { Op } from "sequelize";

router.put("/:id", async (req, res) => {
  try {
    const product_id = req.params.id;
    let updates = {};
    const { product_name, price } = req.body;

    if (product_name) {
      updates.product_name = product_name;
    }
    if (price) {
      updates.price = price;
    }
    const productModel = await initProductData();

    // const isValid = await productModel.findOne({
    //   where: constants.STATE.ACTIVE,
    //   product_id: product_id,
    // });

    // if (isValid) {
      await productModel.update(
        updates,{
        where: {
          product_id: product_id,
        },
    });
      return send(res, RESPONSE.SUCCESS);
    // } else {
    //   return send(res, RESPONSE.INVALID_ID);
    // }
  } catch (err) {
console.log(err); 
return send(res, RESPONSE.UNKNOWN_ERROR);
}
});

export default router;
