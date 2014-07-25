exports.schema = {
  username: String,
  date: {type : Date, default: Date.now},
  muscleGroup: String,
  exercise: String,
  Sets: {reps: Number, kg: Number}
};
