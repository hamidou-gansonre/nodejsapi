const express = require('express');

const app = express();

const router = express.Router();

const contactRoutes = require('./api/routes/contacts');
const todosRoutes = require('./api/routes/todos');
const usersRoutes = require('./api/routes/users');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS error handling
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content-Type,  Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, PATCH, DELETE' );
        return res.status(200).json({});
    }
    next();
})

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