import express from 'express';
import addProduct from "./src/controllers/addProduct.js";
import listProduct from "./src/controllers/listProduct.js";
import listByID from "./src/controllers/listProductById.js";
import search from "./src/controllers/search.js";
import deleteProduct from "./src/controllers/deleteProduct.js";
import editProduct from "./src/controllers/editProduct.js";

import register from "./src/controllers/authorization/register.js"

const routes =(app) =>{
    app.use(express.json());
    app.use("/api/product/add",addProduct);
    app.use("/api/product/list",listProduct);
    app.use("/api/product/list_product",listByID);
    app.use("/api/product/search",search);
    app.use("/api/product/delete",deleteProduct);
    app.use("/api/product/edit",editProduct);

    //auth
    app.use("/api/auth/register",register);

};

export default routes;