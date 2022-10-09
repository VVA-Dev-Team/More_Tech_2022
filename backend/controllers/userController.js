const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')
const tokenController = require('./tokenController')

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, role, name, castleName} = req.body
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            if (!role) {
                return next(ApiError.badRequest('Некорректная роль'))
            }
            if (!name) {
                return next(ApiError.badRequest('Некоректные ФИО'))
            }
            if (!castleName && role === "USER") {
                return next(ApiError.badRequest('Некоректное название замка'))
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return next(ApiError.badRequest('Пользователь уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5)

            const {publicKey, privateKey} = JSON.parse(await tokenController.createWallet())

            const user = await User.create({email, role, name, castleName, password: hashPassword, publicKey, privateKey})
            if (user) {
                await tokenController.transferMatic(process.env.ADMIN_PRIV_KEY, publicKey, 0.005)
            }
            return res.json({user})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }

    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({where: {email}})
            if (!user) {
                return next(ApiError.badRequest('Пользователь не существует'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                return next(ApiError.badRequest('Не верный пароль'))
            }
            return res.json({user})
        } catch (e) {

            return next(ApiError.internal(e.message))
        }

    }

    async check(req, res, next) {
        try {
            const {id} = req.query
            const user = await User.findOne({where: {id}})
            if (!user) {
                return next(ApiError.badRequest('Пользователь не существует'))
            }
            return res.json({user})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const user = await User.findAll()
            if (!user) {
                return next(ApiError.badRequest('Пользователь не существует'))
            }
            return res.json({user})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new UserController()