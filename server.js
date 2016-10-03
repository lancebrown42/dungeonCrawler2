
// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session')
var mongoose = require('mongoose');
var apiRouter = require('./api-routes')
// Create Express App Object \\
var app = express();
var port = 1337;


module.exports = app
// Application Configuration \\
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api/v0', apiRouter)
// Setting up Express session
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false,
})
// Routes \\


// Mongo \\
// Connecting to mongoose for users DB
mongoose.connect('mongodb://localhost/User',
  function(err){
    if(err){
      console.error('ERROR starting mongoose!', err)
    }
    else{
      console.log('Mongoose connected successfully')
    }
  })
// Passport Configuration
var
    User          = require('./models.js').User
    bcrypt        = require('bcryptjs')
    passport      = require('passport')
    LocalStrategy = require('passport-local').Strategy

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser(function(user, done){
  done(null, user.id)
})
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user)
  })
})
// Checking the DB for an existing user
passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username}, function(err, user){
      if(err){return done(err)}
      if(!user){
        return done(null, false, { message: 'Incorrect username.'})
      }
      // If the user does exist, this checks to make sure it is the correct password that was enterred
      bcrypt.compare(password, user.password, function(error, response){
        if(response === true){
          return done(null, user)
        }
        else{
          return done(null, false)
        }
      })
    })
  }
))
app.post('/signup', function(req, res){
  bcrypt.genSalt(11, function(error, salt){
    bcrypt.hash(req.body.password, salt, function(hashError, hash){
      var newUser = new User({
        username            : req.body.username,
        password            : hash,
      })
      newUser.save(function(saveErr, user){
        if(saveErr){res.status(500).send({err: saveErr})}
        else{
          req.login(user, function(loginErr){
            if(loginErr){res.status(500).send({err: loginErr})}
            else{res.send({success: 'success', userId: user._id})}
          })
        }
      })
    })
  })
})
app.post('/login', function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(!user){
      return res.send({error: 'Something went wrong'});
    }
    req.login(user, function(err){
      if(err){return next(err);
      }
      return res.send({success: 'Success', userId: user._id})
    })
  })(req, res, next)
})



app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})
// User API routes
var userCtrl = require('./userController.js')
// app.get('/api/v1/users/:id', userCtrl.get)
// app.put('/api/v1/users/:id', userCtrl.update)


app.get('/', function(req, res){
  res.sendFile('public/index.html')
});
app.get('/game',function(req,res){
	res.sendFile('public/game.html')
})

// Creating Server and Listening for Connections \\
var port = process.env.PORT || port
app.listen(port, function(){
  console.log('Server running on port ' + port);

});
