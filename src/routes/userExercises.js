const router = require("express").Router();
let User = require("../models/user.model");
let Exercise = require("../models/exercise.model");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken.js");

router.post("/", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id).populate("exercises");
    // Validate token
    // If wrong 403, redirect to login
    res.send({ username: user.username, exercises: user.exercises });
  } catch (error) {
    res.status(400).json("Error: ", error);
  }
});

// DELETE USER EXERCISE
router.delete("/delete-exercise", verify, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const id = await jwt.decode(token).id;
    const user = await User.findById(id);
    const exerciseToDelete = req.body.exerciseId;
    const userExercises = user.exercises;
    console.log("exerciseToDelete:", await exerciseToDelete);
    console.log("user.exercises:", user.exercises);

    const deletedExercise = await Exercise.findByIdAndDelete(
      { _id: exerciseToDelete },
      (result, err) => {
        console.log("findandRomve:", result);
      }
    );
    console.log("deletedExercise:", deletedExercise);
    return res.json("User deleted!");
  } catch (error) {
    console.log("ERROR:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
