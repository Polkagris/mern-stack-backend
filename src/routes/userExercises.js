const router = require('express').Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");
const jwt = require('jsonwebtoken');


router.route('/').post(async (req, res) => {
    try {

        const token = req.body.token;
        console.log("test userExercises BETWEEN!----------------------", token);
        const id = await jwt.decode(token)._id;

        //const id = jwt.decode(req.body.token)._id;
        console.log("test userExercises before");
        const user = await User.findById(id).populate('exercises');
        //const userDto = new userDto(user);
        console.log("test userExercises after");
        res.send({ username: user.username, exercises: user.exercises });

    } catch (error) {
        res.status(400).json("Error: ", error);
    }
});

module.exports = router;