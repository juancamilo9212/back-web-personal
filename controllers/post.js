const Post= require('../models/post');

function addPost(req,res){
const body=req.body;
const post=new Post(body);
post.save((err, postStored) => {
if(err){
    res.status(500).send({code: 500, message:"Error del servidor"});
}else{
    if(!postStored){
        res.status(400).send({code:404, message:"No se ha podido crear el post"});
    }else{
        res.status(200).send({code:200, message:"El post ha sido creado correctamente"});
    }
}
})
}

function getPosts(req,res){
    const {page = 1,limit = 10}=req.query;
    const options= {
        page:page,
        limit:parseInt(limit),
        sort:{date: "desc"}
    }
    console.log(limit);
    
    Post.paginate({}, options, (err,postFounded) => {
        if(err){
            res.status(500).send({code:500, message:"Error del servidor"})
        }else{
            if(!postFounded){
                res.status(404).send({code:404, message:"No se ha encontrado ningún post"})
            }else{
                res.status(200).send({code:200, post:postFounded})
            }
        }
    })
}

function updatePost(req,res){
    const {id}=req.params;
    const body=req.body;
    Post.findByIdAndUpdate(id,body,(err,postUpdate) => {
        if(err){
            res.status(500).send({code: 500, message:"Error del servidor"});
        }else{
            if(!postUpdate){
                res.status(404).send({code: 404, message:"Post no encontrado"});
            }else{
                res.status(200).send({code: 200, message:"El post ha sido actualizado correctamente"});
            }
        }
    })

}

function deletePost(req,res){
const {id}=req.params;
Post.findByIdAndRemove(id, (err, postRemoved) => {
    if(err){
        res.status(500).send({code: 500, message:"Error del servidor"});
    }else{
        if(!postRemoved){
            res.status(404).send({code: 404, message:"Post no encontrado"});
        }else{
            res.status(200).send({code: 200, message:"El post ha sido eliminado correctamente"});
        }
    }
})
}

function getPost(req,res){
    const {url} = req.params;
    Post.findOne({url}, (err,postRequested) => {
        if(err){
            res.status(500).send({code: 500, message:"Error del servidor"});
        }else{
            if(!postRequested){
                res.status(404).send({code: 404, message:"Post no encontrado"});
            }else{
                res.status(200).send({code: 200, post:postRequested});
            }
        }
    })
}

module.exports=({
    addPost,
    getPosts,
    updatePost,
    deletePost,
    getPost
})