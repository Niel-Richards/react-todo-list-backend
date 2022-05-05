const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const db =  require('./database');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

app.listen(5000, () => 'Listening on port :5000');


app.get('/tasks', async (req, res) => {
    const result = await db.selectAllTasks();
    res.status(200).json(result);
});
app.post('/tasks', async (req, res) => {
    const result = await db.createTask(req.body);
    const newTask = await db.selectTask(result);
    res.status(201).json(newTask);
});
// The individual task routes
app.get('/tasks/:id', async (req, res) => {
    const result = await db.selectTask(req.params.id);
    res.status(200).json(result);
});
app.patch('/tasks/:id', async (req, res) => {
    const result = await db.updateTask(req.params.id, req.body);
    console.log(result);
    res.status(201).json(result);
});
app.delete('/tasks/:id', async (req, res) => {
    const result = await db.deleteTask(req.params.id);
    res.status(201).json(result);
});

