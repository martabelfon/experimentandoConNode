const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Debes poner el nombre del professor"],
        },

        speciality: {
            type: [String],
            enum: ["html", "css", "js", "node", "react", "angular", "php", "mongo", "sql", "rrhh", "hhss"],
        },

        contactEmail: {
            type: String,
            required: true,
            unique: true,
        },

        schedule: {
            type: String,
        },

        startingDate: {
            type: Date,
        },
    },

    {
        timestamps:true,
    }
);

const Teacher = mongoose.model("teachers", teacherSchema);

module.exports = Teacher;