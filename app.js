const express = require('express');

const app = express();

const router = express.Router();

const contactRoutes = require('./api/routes/contacts');
const todosRoutes = require('./api/routes/todos');
const usersRoutes = require('./api/routes/users');

/**
 * Initialising Routes
 */
app.use('/contacts', contactRoutes)
app.use('/todos', todosRoutes);
app.use('/users', usersRoutes);

//app.use(router);

module.exports = app;