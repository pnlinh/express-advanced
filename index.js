const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const app = express();

const logger = require('./logger');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

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

app.post('/api/courses', (req, res) => {
    // Handle validate input
    const {error} = validateCourse(req.body); // What is error ? Must be dump result validator

    if (error) {
        return res.status(400).send({
            error: error.details[0].message
        });
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);

    res.send(course);
});

/**
 * Handle validate input
 *
 * @param course
 * @returns {ValidationResult<*>}
 */
function validateCourse(course) {
    const rules = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, rules);
}

app.listen(port, () => console.log(`Listening on port ${port}`));