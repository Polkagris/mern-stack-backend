const router = require('express').Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");


// GET ALL USERS
router.route('/').get((req, res) => {
    User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
});

// ADD A USER
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({ username: username, email: email, password: password });

    newUser.save()
        .then(() => {
            res.json("User added!");
        })
        .catch(err => res.status(400).json("Error:" + err))
});


// GET NEW USER EXERCISE BY ID
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).populate('exercises');
        //const userDto = new userDto(user);

        res.send({ username: user.username, exercises: user.exercises });
    } catch (error) {
        res.status(400).json("Error: ", error);
    }
});

// CREATING A NEW REVIEW AND UPDATING PRODUCT review FIELD
router.route('/:id').post(async (req, res) => {

    try {
        const userById = await User.findById(req.params.id).populate('exercises');
        const newExercise = await Exercise.create(req.body)
        userById.exercises.push(newExercise);
        userById.save();
        res.send(newExercise);
    } catch (error) {
        res.status(400).json("Error: ", error);
    }
})

// UPDATE USERNAME ONLY
router.route('/update/:id').post(async (req, res) => {
    try {
        const userToBeUpdated = await User.findById(req.params.id);
        userToBeUpdated.username = req.body.username;
        await userToBeUpdated.save();
        return res.json("User updated: ", userToBeUpdated);
    } catch (err) {
        res.status(400).json("Error: ", err);
    }
});

// DELETE USER
router.route('/:id').delete(async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.json("User deleted!");
    } catch (err) {
        res.status(400).json("Error: ", err);
    }
});

module.exports = router;