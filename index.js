const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require('./logger');
const express = require('express');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

// Set views
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

// Use router
app.use('/', home);
app.use('/api/courses', courses);

// console.log(`Application name: ${config.get('name')}`);
// console.log(`Mail server: ${config.get('mail.host')}`);
// console.log(`Mail password: ${config.get('mail.password')}`);

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

app.use(logger);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
