const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');
const jwt = require('jsonwebtoken');

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

    // Bcrypt hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });

    try {
        await user.save();
        res.status(200).send({ user: user._id, username: user.username });
    } catch (error) {
        res.send(error);
    }
});

// Login
router.route('/login').post(async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message, success: false });

    // Check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Email does not exist.", success: false });

    // Check if password match  
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ message: "Invalid password.", success: false });

    // User is authenticated -> Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '1d'
    });

    //res.cookie('jwt', token, { httpOnly: true, secure: false, maxAge: 3600000 })


    //res.set('Authorization', token).send('Logged in!');

    //res.send('Logged in!');
    res.send({ token: token, success: true });


});

module.exports = router;