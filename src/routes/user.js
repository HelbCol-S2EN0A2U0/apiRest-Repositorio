const express = require('express');
const userSchema = require('../models/userModel'); //IMPORTAMOS EL MODELO DE USUARIO

//CONSTRUCTOR DEL EXPRESS
const router = express.Router();

//DEFINIR RUTA PARA CREAR UN USUARIO
router.post('/user',(req,res)=>{
    // res.send("Ruta para crear usuario");
    // CAMBIAMOS EL MODO DE RESPUESTA DE LA RUTA POR DEFECTO desde la linea 11 a 15
    const userDev = userSchema(req.body);
    userDev.save()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error}));
});

// //OBTENER TODOS LOS USUARIOS DE LA TABLA
router.get('/users',(req,res)=>{
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectAll"}));
});

// //BUSCAR UN USUARIO DE LA TABLA
router.get('/users/:id',(req,res)=>{
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"selectOne"}));
});

// //ACTUALIZAR UN USUARIO DE LA TABLA
router.put('/users/:id',(req,res)=>{
    const {id} = req.params;
    const {name,age,email} = req.body;
    
    userSchema
    .updateOne({_id:id},{$set:{name,age,email}})
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"updateOne"}));
});

// //ELIMINAR UN USUARIO DE LA TABLA
router.delete('/users/:id',(req,res)=>{
    const {id} = req.params;
    userSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))
    .catch((error)=> res.json({message:error, query:"deleteOne"}));
});

//PARA EXPORTAR EN EL SERVIDOR
module.exports = router;