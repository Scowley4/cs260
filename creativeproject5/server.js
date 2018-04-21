// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];  
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// Login
app.post('/api/login', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email', req.body.email).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{name:user.name, id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
}); // END Login


// Register
app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('email', req.body.email).first();
  }).then(user => {
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
}); //END Register

// Get Palettes
app.get('/api/users/:id/palettes', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('palettes','users.id','palettes.user_id')
    .where('users.id',id)
    .select('name','id').then(palettes => {
      console.log('getPalettes - ', palettes);
      res.status(200).json({palettes: palettes});
    }).catch(error => {
      res.status(500).json({ error });
    });
}); // END Get Palettes


// Post Palette
app.post('/api/users/:id/palettes', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('palettes').insert({user_id: id, name: req.body.name});
  }).then(ids => {
    return knex('palettes').where('id',ids[0]).first();
  }).then(palette => {
    res.status(200).json({palette: palette});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
}); // END Post Palette

app.listen(3000, () => console.log('Server listening on port 3000!'));
