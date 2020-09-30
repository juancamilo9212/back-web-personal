const Menu=require('../models/menu');

function addMenu(req,res){
    
    const {title , url, order, active}=req.body;
    const menu=new Menu();
    menu.title=title;
    menu.url=url;
    menu.order=order;
    menu.active=active;

    menu.save((err,createdMenu) => {
        if(err){
            res.status(500).send({message: "Error del servidor"});
        }else{
            if(!createdMenu){
                res.status(404).send({message: "El menu no ha podido ser creado"})
            }else{
                res.status(200).send({message: "El menu se ha creado correctamente"});
            }
        }
    });
}

function getMenu(req,res){

    Menu.find()
    .sort({order: "asc"})
    .exec((err,menuStored) =>{
            if(err){
                res.status(500).send({message: "Error del servidor"});  
            }else{
                if(!menuStored){
                    res.status(404).send({message: "No se ha encontrado ningun menu"});
                }else{
                    res.status(200).send({menu: menuStored});
                }
            }
        });
}

function updateMenu(req,res){
    let menuData=req.body;
    const params=req.params;
    Menu.findByIdAndUpdate({_id: params.id}, menuData, (err,menuUpdate) => {
        if(err){
            res.status(500).send({message:"Error del servidor"})
        }else{
            if(!menuUpdate){
                res.status(404).send({message:"Menu no encontrado"});
            }else{
                res.status(200).send({message:"Menu actualizado correctamente"});
            }
        }
    })  
}

function activateMenu(req,res){
const {id}=req.params;
const {active}=req.query;
Menu.findByIdAndUpdate(id,{active},(err,menuActive) => {
    if(err){
        res.status(500).send({message: "Error del servidor"});
    }else{
        if(!menuActive){
            res.status(404).send({message: "Menu no encontrado"});
        }else{
            res.status(200).send({message: "Menu actualizado correctamente"});
        }
    }
});
}

function deleteMenu(req,res){
    const {id}=req.params;
    Menu.findByIdAndRemove(id,(err,menuDeleted) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!menuDeleted){
                res.status(404).send({message: "Menu no encontrado"});
            }else{
                res.status(200).send({message: "Menu eliminado correctamente"});
            }
        }
    })
}

module.exports = {
    addMenu,
    getMenu,
    updateMenu,
    activateMenu,
    deleteMenu
}