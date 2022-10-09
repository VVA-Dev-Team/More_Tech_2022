const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const role = req.headers.role
            if (!role) {
                return res.status(401).json({ message: "Не авторизован" })
            }
            if (role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }
            req.user.role = role
            next()
        } catch (e) {
            res.status(401).json({ message: "Не авторизован" })
        }
    }
}