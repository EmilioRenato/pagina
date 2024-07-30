const { Schema, model } = require('mongoose');

// Define el esquema de post
const postSchema = new Schema({
    titulo: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco alrededor
    },
    cuerpo: {
        type: String,
        required: true,
        trim: true // Elimina espacios en blanco alrededor
    },
    tipo: {
        type: String,
        enum: ['noticia', 'normativa'], // Puedes definir más tipos si es necesario
        required: true
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt
});

// Exporta el modelo
module.exports = model('Post', postSchema);
