const {Task, UserTask} = require('../models/models')
const ApiError = require('../error/ApiError')

class TaskController {
    async create(req, res, next) {
        // try {
            let {title, description, reward, url} = req.body
            if (title && description && reward && url) {
                const task = await Task.create({title, description, reward, url})
                return res.json(task)
            } else {
                return next(ApiError.internal({message: "Не заданы параметры"}))
            }
        // } catch (e) {
        //     return next(ApiError.internal(e.message))
        // }
    }

    async getAll(req, res) {
        const tasks = await Task.findAll()
        return res.json(tasks)
    }

    async delete(req, res, next) {
        try {
            let {id} = req.body
            if (id) {
                const category = await Task.destroy({where: {id}})
                return res.json(category)
            } else {
                return next(ApiError.badRequest('Не заданы параметры'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async confirmTask(req, res, next) {
        try {
            let {userId, taskId} = req.body
            if (userId && taskId) {
                const task = await UserTask.create({userId, taskId})
                res.json(task)
            } else {
                return next(ApiError.badRequest('Не заданы параметры'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new TaskController()