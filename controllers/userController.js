const { body, validationResult } = require("express-validator");

const User = require("../models/user");

exports.user_create_post = [
   body("username", "Username must be specified")
      .trim()
      .isLength({ min: 1 })
      .escape(),
   // Process request after validation and sanitization.
   (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create a User object with escaped and trimmed data.
      const user = new User({
         username: req.body.username
      })

      // check for errors
      if (!errors.isEmpty()) {
         next(res.json(errors));
      } else {
         user.save((err, data) => {
            if (err) return next(err);
            res.json(data);
         })
      }
   }

];
