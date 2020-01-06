const router = require('express').Router();
const User = require('../models/user.model');
const { registerValidation } = require('../validation');

router.route('/register').post(async (req, res) => {

    // VALIDATE
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

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