const express=require('express');
const NewsLetterController=require('../controllers/newsletter');

const api=express.Router();

api.post("/suscribe-newsletter/:email",NewsLetterController.suscribeEmail);

module.exports=api;