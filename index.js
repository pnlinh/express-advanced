const express = require('express');
const app = express();
const logger = require('./logger');

app.use(express.json());

app.use(logger);

const port = process.env.PORT || 3000;

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
    {id: 4, name: 'course4'}
];

app.get('/', (req, res) => {
    res.send('Hello NodeJs');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.listen(port, () => console.log(`Listening on port ${port}`));