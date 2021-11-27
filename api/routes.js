module.exports = function(app) {
    let usersCtrl = require('./controllers/UserController.js');

    app.route('/users')
        .get(usersCtrl.get)
        .post(usersCtrl.post)
        .put(usersCtrl.put)
        .delete(usersCtrl.delete);
  
};