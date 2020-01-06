const router = require('express').Router();
const User = require('../models/user.model');
const { registerValidation } = require('../validation');

router.route('/register').post(async (req, res) => {

    // VALIDATE DATA
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // Check if email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.send("Email already exists");

    // Check if username exists
    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.send("Username already exists");

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const userToBeSaved = await user.save();
        res.send("User registered:", userToBeSaved);
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;