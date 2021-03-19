require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const adminRoutes = require('./routes/admin')
const userRoutes = require('./routes/user')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/nurture-labs'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected!');
});

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


app.use('/', (req, res) => {
    res.json('All good')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}!`)
})