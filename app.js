const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//app.use(cookieParser('SecretStringForCookies'));
app.use(session({
  secret: 'SecretStringForSession',
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
  const userName = req.flash('user');
  res.render('index', {
    userName
  });
});

app.post('/', (req,res) => {
  req.flash('user', req.body.userName);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});