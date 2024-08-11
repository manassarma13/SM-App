const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const postRoutes = require('./routes/PostRoutes');
const userRoutes = require('./routes/UserRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const { registerUser } = require('./controllers/UserController');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.get('/api/protected', authMiddleware.protect, (req, res) => {
    res.send('Protected route accessed!');
});

app.use('/api', postRoutes);
app.use('/api', userRoutes);

io.on('connection', (socket) => {
    console.log('New WebSocket connection');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));