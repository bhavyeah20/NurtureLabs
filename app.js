require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')

mongoose.connect('mongodb://localhost:27017/nurture-labs', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('db connected')
    })
    .catch(() => {
        console.log('something wrong with the db')
    })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


app.use('/', (req, res) => {
    res.json('All good')
})

app.listen(3000, () => {
    console.log('Server running!')
})