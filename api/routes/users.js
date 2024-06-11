const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users-controller');
const userAuth = require("../middleware/check-auth");

router.post('/signup', UsersController.signup());
router.post('/login', UsersController.login());
router.patch('/update/:id', userAuth,  UsersController.update());
router.get('/loggedInUser', UsersController.loggedInUser());


module.exports = router;