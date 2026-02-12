const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

/* ------------------ CREAR USUARIO ------------------ */
app.post('/users', async (req, res) => {
    try {
        const { nombre, email } = req.body;

        const newUser = new User({ nombre, email });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/* ------------------ VER USUARIOS ------------------ */
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/* ------------------ ACTUALIZAR USUARIO ------------------ */
app.put('/users/:id', async (req, res) => {
    try {
        const { nombre, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { nombre, email },
            { new: true }
        );

        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = app;
