import {Router} from 'express';
import initProductData from '../models/productModel.js';
import RESPONSE from '../config/global.js';
import { send, setErrResMsg } from '../helper/responseHelper.js';
import uploads from '../middleware/uploads.js';
 const router = Router();

 router.post( '/', uploads.single("image") ,async(req, res) =>{

  try{
    const {product_name, price}= req.body;
    const product= await initProductData();
    
    if(!product_name || product_name==""){
      const updatedResponse= setErrResMsg(
         RESPONSE.REQUIRED_PARAMS,
         "Product name"
         );
      return send(res,updatedResponse);
    }

    if(!price || price==""){
      const updatedResponse= setErrResMsg(
         RESPONSE.REQUIRED_PARAMS,
         "Price"
         );
      return send(res,updatedResponse);
    }
    await product.create({
        product_name:product_name,
        price:price,
        image:req.file.filename

    });
    return send(res,RESPONSE.SUCCESS);
 }catch(err){
    return send(res, RESPONSE.UNKNOWN_ERROR);


 }
});

export default router;