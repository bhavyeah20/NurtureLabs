const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const { catchAsync } = require('../utils')

router.post('/register', catchAsync(users.register))

router.post('/login', catchAsync(users.login))

router.get('/:id/advisor', users.showAdvisors)


router.post('/:id/advisor/:advisorId', catchAsync(users.bookAdvisor))


router.get('/:id/advisor/booking', users.showBookings)

module.exports = router;
