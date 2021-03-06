const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./src/routes/exercises');
const usersRouter = require('./src/routes/users');
const authRouter = require('./src/routes/auth');
const userExerciseRouter = require('./src/routes/userExercises');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/user', authRouter);
app.use('/training', userExerciseRouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}, yey!`);
});