const Advisor = require('../models/advisor')

module.exports.add = async (req, res) => {
    try {
        const { name, photoUrl } = req.body
        const advisor = new Advisor({ name, photoUrl })
        await advisor.save()
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
}
