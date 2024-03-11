import { Router } from "express";
import initProductData from "../models/productModel.js";
import constants from "../config/constants.js";
import { send } from "../helper/responseHelper.js";
import RESPONSE from "../config/global.js";
const router = Router();

router.get("/", async (req, res) => {
  try {

    const page= Number(req.query.page)? Number(req.query.page): 1
    const limit= Number(req.query.limit)? Number(req.query.limit):10
    let offset=(page-1)*limit;
    const productModel = await initProductData();

    let data = await productModel.findAll({
      where: { isactive: constants.STATE.ACTIVE },
      order: [["createdAt", "DESC"]],
      attribute: ["product_id", "product_name", "price", "image"],
      offset:offset,
      limit:limit,
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
