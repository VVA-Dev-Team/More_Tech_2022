const {Cell, Building} = require('../models/models')
const ApiError = require('../error/ApiError')

class MapController {

    async getUserMap(req, res, next) {
        try {
            const {userId} = req.query
            const data = await Cell.findAll({where: {userId: userId}})
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async updateCell(req, res, next) {
        try {
            const {cellId} = req.body
            const old_cell = await Cell.findOne({where: {id: cellId}})
            const newCell = await Cell.update({buildingId: old_cell.buildingId + 5}, {where: {id: cellId}})
            return res.json(newCell)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new MapController()