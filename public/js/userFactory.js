    angular.module('userFactoryModule',[])
      .factory('userFactory',userFactory)

      module.exports = {

    get : function(req, res){

        if(req.params.id){
            // Get One
            user.findOne({_id : req.params.id}, function(err, user){
                res.send(user)
            })
        }
        else{
            // Get Many
            user.find({}, function(err, users){
                res.send(users)
            })
        }

    },

    upsert : function(req, res){
        if(req.params.id){
            // Update
            user.update({_id : req.params.id}, req.body, function(err, updated){
                if(err){
                   return res.send(err)
                }
                res.send(updated)
            })
        }
        else{
            // Create
            var newUser = new user(req.body)
            
            newUser.save(function(err, doc){
                res.send(doc)
            })
        }
    },
    
    delete : function(req, res){

    }

}