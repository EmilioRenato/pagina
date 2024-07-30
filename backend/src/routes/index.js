const { Router } = require('express');
const router = Router();
const user = require('../models/user');
const Post = require('../models/post');
const jwt = require('jsonwebtoken');

// Middleware de verificación del token
function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send('Unauthorized Request 1');
    
    try {
        const payload = jwt.verify(token, 'secretKey');
        req.userId = payload._id;
        req.userRole = payload.role; // Obtén el rol del usuario
        next();
    } catch (err) {
        res.status(401).send('Unauthorized Request 2');
    }
}

// Middleware de autorización
function authorizeRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.userRole)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
}

router.get('/', (req, res) => res.send('Hello World'));

// Registro de usuario
router.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    if (!email.match(/@ups\.edu\.ec$/)) return res.status(400).send('Invalid email domain');
    if (password.length < 6) return res.status(400).send('Password must be at least 6 characters');

    const newUser = new user({ email, password, role });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id, role: newUser.role }, 'secretKey');
    res.status(200).json({ token });
});

// Inicio de sesión de usuario
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userFind = await user.findOne({ email });
    if (!userFind) return res.status(401).send("Email not found");
    if (userFind.password !== password) return res.status(401).send("Incorrect password");

    const token = jwt.sign({ _id: userFind._id, role: userFind.role }, 'secretKey');
    res.status(200).json({ token });
});

// Tareas públicas
router.get('/task', (req, res) => {
    res.json([
        { _id: 1, name: 'Task one', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" },
        { _id: 2, name: 'Task two', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" },
        { _id: 3, name: 'Task three', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" }
    ]);
});

// Tareas privadas (solo administradores y operadores)
router.get('/private-task', verifyToken, authorizeRoles('admin', 'operator'), (req, res) => {
    res.json([
        { _id: 1, name: 'Task one', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" },
        { _id: 2, name: 'Task two', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" },
        { _id: 3, name: 'Task three', description: 'lorem ipsum', date: "2024-11-17T20:39:05.211Z" }
    ]);
})
;


router.post('/posts', async (req, res) => {
    const { titulo, cuerpo, tipo } = req.body;

    // Validaciones
    if (!titulo || !cuerpo || !tipo) return res.status(400).send('Faltan campos requeridos');
    if (!['noticia', 'normativa'].includes(tipo)) return res.status(400).send('Tipo inválido');

    // Crear una nueva instancia del modelo Post
    const newPost = new Post({
        titulo,
        cuerpo,
        tipo
    });

    try {
        // Guardar el nuevo post en la base de datos
        const savedPost = await newPost.save();
        // Enviar una respuesta con el post guardado
        res.status(201).json(savedPost);
    } catch (err) {
        // Manejar errores
        res.status(500).json({ message: err.message });
    }
});
router.get('/posts', async (req, res) => {
    try {
        // Obtener todos los posts
        const posts = await Post.find();
        // Enviar la lista de posts
        res.status(200).json(posts);
    } catch (err) {
        // Manejar errores
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;
