const router = require('express').Router();
let Exercise = require("../models/exercise.model.js");
const verify = require('../verifyToken.js')

router.get('/', verify, async (req, res) => {
    try {
        const exercises = await Exercise.find();
        return res.json(exercises);
    } catch (err) {
        res.json("Error:" + err);
    }
});

router.route('/add').post(async (req, res) => {
    try {
        //const username = req.body.username;
        const description = req.body.description;
        //const duration = Number(req.body.duration);
        //const date = Date.parse(req.body.date);

        const newExercise = new Exercise({
            description

        });
        await newExercise.save()
        res.json("Exercise added!");
    } catch (err) {
        res.status(400).json("Error: " + err);
    }

});

router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const exercises = await Exercise.findById(id);
        return res.json(exercises);

    } catch (err) {
        return res.json("Error: ", err);
    }

});

// FIND AND POPULATE EXERCISES
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const exercises = await Exercise.findById(id).populate('user');
        return res.json(exercises);

    } catch (err) {
        return res.json("Error: ", err);
    }

});

router.route('/:id').delete(async (req, res) => {
    try {
        await Exercise.findByIdAndDelete(req.params.id);
        return res.json("Exercise deleted!");
    } catch (err) {
        return res.json("Error: ", err);
    }
});

router.route('/update/:id').post(async (req, res) => {
    try {
        let toUpdateExercise = await Exercise.findById(req.params.id);


        toUpdateExercise.description = req.body.description;
        /*         toUpdateExercise.duration = Number(req.body.duration);
                toUpdateExercise.date = Date.parse(req.body.date); */


        await toUpdateExercise.save();
        return res.json("Excerise updated!");

    } catch (err) {
        return res.json("Error updating: ", err);
    }
});

module.exports = router;