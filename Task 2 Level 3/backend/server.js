const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Project = require('./models/Project'); 
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully! 🟢"))
    .catch((err) => console.log("MongoDB Connection Failed! 🔴", err));

app.get('/api/projects/all', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: "Projects lane mein dikkat aayi" });
    }
});


app.post('/api/projects/add', async (req, res) => {
    try {
        const { title, description, assignee, deadline, status } = req.body;
        const newProject = new Project({ title, description, assignee, deadline, status });
        await newProject.save();
        res.status(201).json({ message: "Project added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Project save nahi ho paya" });
    }
});


app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted successfully! 🗑️" });
    } catch (error) {
        res.status(500).json({ error: "Project delete nahi ho paya" });
    }
});

app.put('/api/projects/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ error: "Project update nahi ho paya" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});