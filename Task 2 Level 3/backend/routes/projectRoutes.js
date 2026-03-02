const express = require('express');
const router = express.Router();
// Dhyan rahe: Iske liye models folder mein Project.js hona zaroori hai jo humne pehle banaya tha
const Project = require('../models/Project');

// 1. Naya Project Save Karne Ka Rasta (POST API)
router.post('/add', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json({ message: "Project mast save ho gaya!", project: newProject });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 2. Saare Projects Dekhne Ka Rasta (GET API)
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;