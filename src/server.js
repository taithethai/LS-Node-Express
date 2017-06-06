const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// serializing users by making username the key, and then adding them to array, to keep order of added
const users = {};
const order = [];
let nextID = 0;
// * [GET] `/users` This route will return an array of all users. WORKING

app.get('/users', (req, res) => {
  const values = order.map(key => users[key]);
  res.send(values);
});

// * [GET] `/users/:id` This route will return the user with the matching `id` property. WORKING

app.get('/users/:id', (req, res) => {
  const id = users[req.body.id];
  res.send(id);
});

// * [GET] `/search?name=<query>` The query parameter passed to this route should specify the name of the user you are searching for.

app.get('/search', (req, res) => {
  const term = req.query.name;
  const answers = [];
  order.forEach((key) => {
    if (term === users[key].name) answers.push(users[key]);
    console.log(users[key].name === term);
  });
  res.send(answers);
});

// * [POST] `/new-user` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.) WORKING

app.post('/users', (req, res) => {
  const id = nextID;
  nextID++;
  order.push(id);
  users[id] = req.body;
  res.end('added');
});

// * [DELETE] `/users/:id` This route should delete the specified user.
// Your user objects can take any form.  Just ensure that they have an `id` property.  You can generate this `id` property on the server any way you like.

app.delete('/users/:id', (req, res) => {
  
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
