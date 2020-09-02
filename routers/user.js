const express=require("express");
const UserController=require("../controllers/user");
const api=express.Router();
const multiparty=require("connect-multiparty");
const md_auth=require('../middleware/authenticated');
const md_load_avatar=multiparty({uploadDir: "./uploads/avatar"});

api.post("/sign-up",UserController.signUp);
api.post("/sign-in",UserController.signIn);
api.get("/users",[md_auth.ensureAuth],UserController.getUsers);
api.get("/users-active",[md_auth.ensureAuth],UserController.getActiveUsers);
api.put("/load-avatar/:id",[md_auth.ensureAuth,md_load_avatar],UserController.loadAvatar);
api.get("/avatar/:avatarName",[md_auth.ensureAuth],UserController.getAvatar);

module.exports=api;