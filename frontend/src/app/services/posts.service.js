const Post = require('./post.model');

// Crear un nuevo post
exports.createPost = async (data) => {
    try {
        const post = new Post(data);
        return await post.save();
    } catch (error) {
        throw error;
    }
};

// Obtener todos los posts
exports.getPosts = async () => {
    try {
        return await Post.find();
    } catch (error) {
        throw error;
    }
};

// Obtener un post por ID
exports.getPostById = async (id) => {
    try {
        return await Post.findById(id);
    } catch (error) {
        throw error;
    }
};

// Actualizar un post por ID
exports.updatePost = async (id, data) => {
    try {
        return await Post.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw error;
    }
};

// Eliminar un post por ID
exports.deletePost = async (id) => {
    try {
        return await Post.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
};
