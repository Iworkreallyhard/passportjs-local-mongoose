const { passport, app } = require('./setup')
const { isLoggedIn, format } = require('./middleware')

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', format,
    passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
    function (req, res) {
        res.redirect('/secret');
    });

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const { email, password } = req.body
    const user = new User({ username: email });
    await user.setPassword(password);
    await user.save();
    res.send('User created')
})

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

app.get('/secret', isLoggedIn, (req, res, next) => {
    console.log(req.session)
    res.render('secret')
})

