var mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
	username: {
      type: String,
      unique: true,
      required: true
   },
   email: {
      type: String,
      unique: true,
      required: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
   },
   password: {
      type: String,
      required: true
   },
   score: {
   	type: Number
   },
   kills: {
   	type: Number
   },
   armor: {
   	type: String
   },
   gold: {
   	type: Number
   },
   health: {
   	type: Number
   },
   position: {
   	type: Array
   }
})


var User = mongoose.model('User', userSchema)
module.exports = User