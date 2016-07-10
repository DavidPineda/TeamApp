var user = require('../controllers/users');
module.exports = function(app){
	app.get('/partials/*', function(req, res) {
	  	res.render('../../public/app/' + req.params['0']);
	});

	app.post('/register', user.register);

	app.post('/login', user.login);

	app.post('/logout', user.logout);

	app.get('/session', user.userAuthenticated);

	app.get('*', function(req, res) {
	  	res.render('index');
	});
};