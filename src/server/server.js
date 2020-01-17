const express = require('express');
const os = require('os');
const app = express();
app.use(express.static('dist'));
const members = require('./members');

app.get('/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.get('/api/members', (req, res) => res.json(members));

app.listen(8080, () => console.log('Listening on port 8080!'));
