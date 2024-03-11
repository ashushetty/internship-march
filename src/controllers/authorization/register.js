import { Router } from "express";
const router = Router();
import inituserData from "../../models/userModel.js";
import {send, setErrResMsg } from "../../helper/responseHelper.js";
import RESPONSE from "../../config/global.js";

import bcrypt from "bcrypt"
import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userModel = await inituserData();

    if (!username || username == "") {
      const updatedResponse = setErrResMsg(RESPONSE.REQUIRED_PARAMS, "email");
      return send(res, updatedResponse);
    }
    if (!password || password == "") {
      const updatedResponse = setErrResMsg(
        RESPONSE.REQUIRED_PARAMS,
        "password"
        
      );
      return send(res, updatedResponse);
    }
    if (!email || email == "") {
      const updatedResponse = setErrResMsg(RESPONSE.REQUIRED_PARAMS, "email");
      return send(res, updatedResponse);
    }

    const isExistingEmail = await userModel.findOne({
        where:{
            email:email,
            isactive:constants.STATE.ACTIVE
        }
    })

    if(isExistingEmail){
        const updatedResponse= setErrResMsg(
            RESPONSE.EXISTING_DATA,
            "email"
        );
        return send(res, updatedResponse);
    }

    const encryptedPassword = await bcrypt.hash(password,10);


    await userModel.create({
        email:email,
        user_name: username,
        password:encryptedPassword,

    });

    return send(res, RESPONSE.SUCCESS);



  } catch(err) {
    console.log(err);
    return send(res,RESPONSE.UNKNOWN_ERROR)
  }
});

export default router;
