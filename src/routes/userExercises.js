const router = require('express').Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");
const jwt = require('jsonwebtoken');


router.route('/').post(async (req, res) => {
    try {
        const token = req.headers.authorization;
        const id = await jwt.decode(token).id;
        const user = await User.findById(id).populate('exercises');
        // Validate token
        // If wrong 403, redirect to login
        res.send({ username: user.username, exercises: user.exercises });

    } catch (error) {
        res.status(400).json("Error: ", error);
    }
});

module.exports = router;