require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const middleAuth = require('./middlewares/checkAuth');

const userController = require('./controllers/UserController');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
    
}));

const PORT = process.env.PORT || 5000;

app.post('/register', userController.register);
app.post('/login', userController.login);
app.post('/logout', userController.logout);
app.get('/refresh', userController.refresh);

app.get('/profile/:id', userController.getUser);
app.post('/profile/update/:id', userController.updateUser);

app.get('/statistic/:id', userController.getStatistic);

const start = () => {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    app.listen(PORT, () => console.log(`server started on the ${PORT} port`));
};

start();
