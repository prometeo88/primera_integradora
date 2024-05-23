const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        let users = await userModel.find()
        res.send({result: "success", payload: users})
    } catch (error) {
        console.log("Error cargar usuarios")
        
    }
})

router.post('/', async (req ,res) => {
    let {nombre,apellido,email} = req.body

    let result = await userModel.create({nombre,apellido,email})
    res.send({result:"success", payload: result})
})
 
router.put('/', (req ,res) => {
    
})

router.delete('/', (req ,res) => {
    
})
modules.exports = router;