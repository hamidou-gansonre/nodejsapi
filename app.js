const express = require('express');

const app = express();

const router = express.Router();

const contactRoutes = require('./api/routes/contacts');
const todosRoutes = require('./api/routes/todos');
const usersRoutes = require('./api/routes/users');
const morgan = require('morgan');


app.use(morgan('dev'));

/**
 * Initialising Routes
 */
app.use('/contacts', contactRoutes)
app.use('/todos', todosRoutes);
app.use('/users', usersRoutes);

//Error handling
app.use((req, res, next) => {
    const error = new Error('Route not found');
    error.status = 404 ;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//app.use(router);

module.exports = app;