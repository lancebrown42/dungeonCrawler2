var apiRouter = require('express').Router()

var userController = require('./userController')

// http://localhost/api/v0/users
apiRouter.route('/users')
    .get(userController.all)
    .post(userController.create)

// http://localhost/api/v0/users/:id
apiRouter.route('/users/:id')
    .get(userController.single)
    .put(userController.update)
    .delete(userController.destroy)

module.exports = apiRouter