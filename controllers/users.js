const User = require('../models/user');
const Advisor = require('../models/advisor');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const hashedPw = await bcrypt.hash(password, 12)
        const user = new User({ name, email, password: hashedPw })
        await user.save()
        const token = jwt.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
        const id = user._id
        req.user = user
        res.status(200).json({
            token,
            id
        })

    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
}

module.exports.showAdvisors = async (req, res) => {
    const advisors = await Advisor.find({})
    res.status(200).json(advisors)
}

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user)
            return res.sendStatus(401)
        const verifyPw = await bcrypt.compare(password, user.password)
        if (!verifyPw)
            return res.sendStatus(401)

        const token = jwt.sign({ name: user.name, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
        const id = user._id
        req.user = user
        res.status(200).json({
            token,
            id
        })
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
}

module.exports.bookAdvisor = async (req, res) => {
    try {
        const { id, advisorId } = req.params
        const { date } = req.body
        if (!date)
            return res.sendStatus(400)
        const user = await User.findById(id)
        const advisor = await Advisor.findById(advisorId)
        user.bookings.push({
            date,
            advisor
        })

        user.save()
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
}

module.exports.showBookings = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        let response = []
        for (let booking of user.bookings) {
            let advisor = await Advisor.findById(booking.advisor)
            let advisorObject = {
                advisorId: advisor._id,
                name: advisor.name,
                photoUrl: advisor.photoUrl,
                date: booking.date,
                bookingId: booking._id
            }
            response.push(advisorObject)
        }


        res.status(200).json(user.bookings)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
}