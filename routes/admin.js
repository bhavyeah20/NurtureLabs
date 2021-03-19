const express = require('express')
const router = express.Router()
const advisors = require('../controllers/advisors')
const { catchAsync } = require('../utils')

router.post('/advisor', catchAsync(advisors.add))

module.exports = router
