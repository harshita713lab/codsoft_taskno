const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    // Yeh sabse zaroori line hai: Yeh task kis Project ka hai?
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    assignedTo: {
        type: String // Yahan hum user ka naam dalenge jisko task diya hai
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'], // In teeno mein se hi koi ek status ho sakta hai
        default: 'To Do'
    }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);