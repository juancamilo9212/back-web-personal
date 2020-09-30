const NewsLetter=require("../models/newsletter");

function suscribeEmail(req,res){

const email=req.params.email;

const newsletter=new NewsLetter();

if(!email){
    res.status(404).send({message: "El correo electrónico no fue encontrado"});
}else{
    newsletter.email=email.toLowerCase();
    newsletter.save((err,emailCreated) => {
        if(err){
            res.status(500).send({message: "Error del servidor"});
        }else{
            if(!emailCreated){
                res.status(404).send({message: "El correo electrónico no fue encontrado"});
            }else{
                res.status(200).send({message: "El correo electrónico fue creado exitosamente"});
            }
             }
    });
}
}

module.exports={
    suscribeEmail
}