import "dotenv/config";
import express from "express";
import * as excercises from "./exercises-model.mjs";
import { body, validationResult } from "express-validator";

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// CREATE controller ******************************************
app.post(
  "/exercises",
  body("name")
    .exists({ checkNull: true, checkFalsey: true })
    .isString()
    .isLength({ min: 1 }),
  body("reps").exists({ checkNull: true, checkFalsey: true }).isInt({ min: 1 }),
  body("weight")
    .exists({ checkNull: true, checkFalsey: true })
    .isInt({ min: 1 }),
  body("unit")
    .exists({ checkNull: true, checkFalsey: true })
    .isIn(["lbs", "kgs", "mi", 'km']),
  body("date")
    .exists({ checkNull: true, checkFalsey: true })
    .isDate({ format: "YYYY-MM-DD", delimiters: ["-", "/"] }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    excercises
      .createExercise(
        req.body.name,
        req.body.reps,
        req.body.weight,
        req.body.unit,
        req.body.date
      )
      .then((excercise) => {
        res.status(201).json(excercise);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          error: "Creation of a document failed due to invalid syntax.",
        });
      });
  }
);

// RETRIEVE controller ****************************************************
// GET exercises by ID
app.get("/exercises/:_id", (req, res) => {
  const excerciseId = req.params._id;
  excercises
    .findExerciseById(excerciseId)
    .then((exercise) => {
      if (exercise !== null) {
        res.json(exercise);
      } else {
        res.status(404).json({ Error: "Document not found" });
      }
    })
    .catch((error) => {
      res.status(400).json({ Error: "Request to retrieve document failed" });
    });
});

// GET exercises filtered by year or language
app.get("/exercises", (req, res) => {
  let filter = {};
  // filter by year
  if (req.query.year !== undefined) {
    filter = { year: req.query.year };
  }
  // filter by language
  if (req.query.language !== undefined) {
    filter = { language: req.query.language };
  }
  excercises
    .findExercise(filter, "", 0)
    .then((excercises) => {
      res.send(excercises);
    })
    .catch((error) => {
      console.error(error);
      res.send({ Error: "Request to retrieve documents failed" });
    });
});

// DELETE Controller ******************************
app.delete("/exercises/:_id", (req, res) => {
  excercises
    .deleteById(req.params._id)
    .then((deletedCount) => {
      if (deletedCount === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ Error: "Document not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.send({ error: "Request to delete a document failed" });
    });
});

// UPDATE controller ************************************
app.put("/exercises/:_id", (req, res) => {
  excercises
    .replaceExercise(
      req.params._id,
      req.body.name,
      req.body.reps,
      req.body.weight,
      req.body.unit,
      req.body.date
    )

    .then((numUpdated) => {
      if (numUpdated === 1) {
        res.status(200).json({
          _id: req.params._id,
          name: req.body.name,
          reps: req.body.reps,
          weight: req.body.weight,
          unit: req.body.unit,
          date: req.body.date,
        });
      } else {
        res.status(404).json({ Error: "Document not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ Error: "Request to update a document failed" });
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
