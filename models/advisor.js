const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AdvisorScehma = new Schema({
    name: {
        type: String,
        required: true
    },

    photoUrl: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Advisor', AdvisorScehma)