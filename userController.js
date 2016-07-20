var User = require('./models')

var userController = {
    all: function( req, res ) {
        User.find({}, function(error, users){
            if( error ) {
                console.error('ERROR finding users:', error)
            } else {
                res.json( users )
            }
        })
    },
    create: function( req, res ) {
        var newUser = new User( req.body )

        newUser.save(function(error, user){
            if( error ) {
                console.error('ERROR saving newUser:', error)
            } else {
                res.json( user )
            }
        })
    },
    single: function( req, res ) {
        var id = req.params.id

        User.findById(id, function(error, user){
            if( error ) {
                console.error('ERROR finding userById:', error)
            } else {
                res.json( user )
            }
        })
    },
    update: function( req, res ) {
        var id = req.params.id

        // { new: true } we use this third argument so that we get the updated object back in the callback
        User.findByIdAndUpdate(id, req.body, { new: true }, function( error, upUser ){
            if( error ) {
                console.error('ERROR finding updating user:', error)
            } else {
                res.json( upUser )
            }
        })
    },
    destroy: function( req, res ) {
        var id = req.params.id

        User.findByIdAndRemove(id, function( error ){
            if( error ) {
                console.error('ERROR removing user!', id)
            } else {
                res.json({
                    success: true,
                    message: "Deleted user with id: "+ id
                })
            }
        })
    }
}

module.exports = userController