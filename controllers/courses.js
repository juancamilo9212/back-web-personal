const Course=require('../models/courses');

function addCourse(req,res){
    const body=req.body;
    const course=new Course(body);
    course.order=1000;

    course.save((err, courseStorage) => {
        if(err){
            res.status(400).send({code:400,message:"El curso ya existe" })
        }else{
            if(!courseStorage){
                res.status(404).send({code:404,message:"El curso no ha sido encontrado" })
            }else{
                res.status(200).send({code:200,message:"El curso ha sido creado correctamente"})
            }
        }
    })
    
}

function getCourse(req,res){
    Course.find().sort({order:"asc"}).exec((err,courseStored)=>{
        if(err){
            res.status(500).send({message:"Error del servidor"});
        }else{
            if(!courseStored){
                res.status(404).send({message:"Cursos no encontrados"});
            }else{
                res.status(200).send({code:200,courses:courseStored});
            }
        }
    })
}

function deleteCourse(req,res){
    const {id}=req.params;
    Course.remove({_id:id},(err,deletedCourse) => {
        if(err){
            res.status(500).send({message:"Error en el servidor"});
        }else{
            if(!deletedCourse){
                res.status(404).send({message: "No se ha encontrado el curso"});
            }else{
                res.status(200).send({message:"El curso ha sido eliminado correctamente"});
            }
        }
    })
}

function updateCourse(req,res){
    const body=req.body;
    const {id}=req.params;
    Course.findByIdAndUpdate({_id:id},body,(err,updateBody) => {
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(!updateBody){
                res.status(404).send({message: "El curso no ha sido encontrado"});
            }else{
                res.status(200).send({message: "El curso ha sido actualizado correctamente"});
            } 
        }
    })
}

module.exports={
    addCourse,
    getCourse,
    deleteCourse,
    updateCourse
}