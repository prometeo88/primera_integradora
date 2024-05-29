const express = require('express');
const userModel = require('../models/user.model');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let users = await userModel.find();
        res.send({ result: "success", payload: users });
    } catch (error) {
        console.error("Error cargar usuarios", error);
        res.status(500).send({ result: "error", message: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        let { nombre, apellido, email } = req.body;

        if (!nombre || !apellido || !email) {
            return res.status(400).send({ result: "error", message: "All fields are required" });
        }

        let result = await userModel.create({ nombre, apellido, email });
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error('Error creating user', error);
        res.status(500).send({ result: "error", message: "Internal Server Error" });
    }
});

router.put('/:uid', async (req, res) => {
    try {
        const userId = req.params.uid;
        const updatedUser = req.body;

        const result = await userModel.findByIdAndUpdate(userId, updatedUser, { new: true });

        if (!result) {
            return res.status(404).send({ result: "error", message: "Usuario no encontrado" });
        }

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error('Error updating user', error);
        res.status(500).send({ result: "error", message: "Internal Server Error" });
    }
});

router.delete('/:uid', async (req, res) => {
    try {
        const userId = req.params.uid;
        const result = await userModel.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).send({ result: "error", message: "User not found" });
        }

        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).send({ result: "error", message: "Internal Server Error" });
    }
});

module.exports = router;