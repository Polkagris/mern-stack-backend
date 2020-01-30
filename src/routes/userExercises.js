const router = require('express').Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");
const jwt = require('jsonwebtoken');


router.route('/').post(async (req, res) => {
    try {

        const id = jwt.decode(req.body.token)._id;

        const user = await User.findById(id).populate('exercises');
        //const userDto = new userDto(user);

        res.send({ username: user.username, exercises: user.exercises });

    } catch (error) {
        res.status(400).json("Error: ", error);
    }
});

module.exports = router;