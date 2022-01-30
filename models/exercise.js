const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   description: {
      type: String,
      maxLength: 200
   },
   duration: Number,
   date: {
      type: Date
   }
});

ExerciseSchema.virtual("date_formatted").get(function() {
   return this.date.toDateString();
})

module.exports = mongoose.model("Exercise", ExerciseSchema);
