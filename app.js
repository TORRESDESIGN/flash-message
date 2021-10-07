const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const pug = require('pug');

const app = express();

const port = process.env.PORT || 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(session({
  secret: 'SecretStringForSession',
  cookie: {maxAge: 60000},
  resave: true,
  saveUninitialized: true
}));
app.use(flash());//flash will flush out errors after displaying them

//app.set('view engine', 'ejs');
app.set('view engine', 'pug');

app.get('/', (req,res) => {
  const userName = req.flash('user');
  const success_messages = req.flash('success_messages');
  const error_messages = req.flash('error_messages');
  res.render('index', {
    userName,
    success_messages,
    error_messages
  });
});

app.post('/', (req,res) => {
  req.flash('user', req.body.userName);
  req.flash('success_messages', 'Success!!');
  req.flash('error_messages', "That didn't work!!");
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});