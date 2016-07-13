var user = require('../controllers/users');
var task = require('../controllers/tasks');
var resource = require('../controllers/resource')
var passport = require('./passport');
var multiparty = require('connect-multiparty')();

module.exports = function(app){
	app.get('/partials/*', function(req, res) {
	  	res.render('../../public/app/' + req.params['0']);
	});

	app.post('/register', user.register);

	app.post('/login', user.login);

	app.post('/logout', user.logout);

	app.get('/session', user.userAuthenticated);

	app.get('/auth/twitter', passport.authenticate('twitter'));	

	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		})
	);

	app.post('/tasks', task.saveTask);

	app.get('/tasks', task.getTask);

	app.post('/tasks/ended', task.saveTasksEnded);	

	app.get('/tasks/ended', task.getTask)

	app.post('/resource', multiparty, resource.saveResource)

	app.get('*', function(req, res) {
	  	res.render('index');
	});
};