const { Schema, model } = require('mongoose');

// Define el esquema de usuario
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@ups\.edu\.ec$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['guest', 'operator', 'admin'],
        default: 'guest'
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt
});

// Exporta el modelo
module.exports = model('User', userSchema);
