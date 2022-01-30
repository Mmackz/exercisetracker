const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
   username: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   description: {
      type: String,
      maxLength: 200
   },
   duration: Number,
   date: Date,
   _id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   }
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
