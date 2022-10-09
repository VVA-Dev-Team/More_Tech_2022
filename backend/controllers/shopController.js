const {Shop} = require('../models/models')
const ApiError = require('../error/ApiError')

class ShopController {
    async create(req, res, next) {
        try {
            let {title, description, price} = req.body
            if (title && description && price) {
                const item = await Shop.create({title, description, price})
                return res.json(item)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const items = await Shop.findAll()
            return res.json(items)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            let {id} = req.body
            if (id) {
                const partner = await Shop.destroy({where: {id}})
                return res.json(partner)
            } else {
                return next(ApiError.badRequest('Не заданы параметры'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ShopController()