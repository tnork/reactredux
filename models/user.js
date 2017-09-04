// Mongoose Model Class

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //Using schema property of course
// const { Schema } = mongoose; // ES2015 style of deconstruction

// Schema limits the flexible properties Mongo allows 
const userSchema = new Schema({
  googleID: String,
  firstName: String,
  lastName: String
});

mongoose.model('users', userSchema); //If collection already exists with schema will not overwrite
