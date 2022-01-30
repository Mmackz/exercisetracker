const { body, validationResult } = require("express-validator");

const Exercise = require("../models/exercise");
const user = require("../models/user");
const User = require("../models/user");

const dateRegex = /^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
const limitRegex = /^\d+$/;

exports.exercise_create_post = (req, res, next) => {
   const { description, duration } = req.body;
   // validate inputs
   if (description === "") {
      return next("Path `description` is required.");
   }

   if (+duration < 1) {
      return next("duration too short");
   }

   // check if user id in database
   User.findById(req.body[":_id"], (err, data) => {
      if (err) return next(err);
      if (data === null) {
         return next("Unknown userId");
      } else {
         const exercise = new Exercise({
            username: data.username,
            description: req.body.description,
            duration: req.body.duration,
            date: req.body.date || Date.now()
         });

         exercise.save((err, saved) => {
            if (err) return next(err);
            res.json({
               _id: data._id,
               username: saved.username,
               date: saved.date_formatted,
               duration: saved.duration,
               description: saved.description
            });
         });
      }
   });
};

exports.exercise_logs_get = (req, res, next) => {
   User.findById(req.params.id, (err, data) => {
      if (err) return next(err);
      if (data === null) {
         res.write("<pre>Unknown userId</pre>");
         res.send();
      } else {
         Exercise.find({ username: data.username }, (err, exercises) => {
            if (err) return next(err);

            const { from, to, limit } = req.query;

            if (dateRegex.test(from)) {
               const fromDate = new Date(from);
               exercises = exercises.filter((exercise) => {
                  return exercise.date >= fromDate
               });
            }

            if (dateRegex.test(to)) {
               const toDate = new Date(to);
               exercises = exercises.filter((exercise) => {
                  return exercise.date <= toDate
               });
            }

            if (limitRegex.test(limit)) {
               console.log(limit)
               exercises = exercises.slice(0, limit);
            }

            res.json({
               _id: data._id,
               username: data.username,
               count: exercises.length,
               log: exercises.map(
                  ({ description, duration, date_formatted }) => ({
                     description,
                     duration,
                     date: date_formatted
                  })
               )
            });
         });
      }
   });
};
