var mongoose = require("mongoose")

var userSchema = mongoose.Schema({
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
})


var User = mongoose.model('User', userSchema)
module.exports = {
	User : User,
}