/* eslint-disable no-param-reassign */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.PORT || 3003));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/todo', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/todo', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const todos = JSON.parse(data);
    const newTodo = {
      title: req.body.title,
      status: req.body.status,
      id: req.body.id
    };
    todos.push(newTodo);
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(todos);
    });
  });
});

app.put('/api/todo', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const todos = JSON.parse(data);
    todos.forEach((todo) => {
      if (todo.id === req.body.id) {
        todo.title = req.body.title;
        todo.status = req.body.status;
      }
    });
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 4), () => {
      res.json({});
    });
  });
});

app.delete('/api/todo', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    let todos = JSON.parse(data);
    todos = todos.reduce((memo, todo) => {
      if (todo.id === req.body.id) {
        return memo;
      } else {
        return memo.concat(todo);
      }
    }, []);
    fs.writeFile(DATA_FILE, JSON.stringify(todos, null, 4), () => {
      res.json({});
    });
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
