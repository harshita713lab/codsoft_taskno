const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String, required: true }, // NAYA: Task kisko diya
    deadline: { type: Date, required: true },   // NAYA: Kab tak karna hai
    status: { type: String, default: "Pending" } // NAYA: Progress kahan tak pohnchi
});

module.exports = mongoose.model('Project', projectSchema);