const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data', 'data.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', (req, res) => {
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Read error');
    res.json(JSON.parse(data));
  });
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  fs.readFile(DATA_FILE, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Read error');
    let users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send('Write error');
      res.status(200).send('User added');
    });
  });
});

app.put('/api/users/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (index >= 0 && index < users.length) {
    users[index] = req.body;
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    res.status(200).send({ message: 'User updated' });
  } else {
    res.status(400).send({ message: 'Invalid index' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
