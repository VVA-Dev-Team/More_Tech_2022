const {TestQuestion, Battle, UserResult} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require("sequelize");

class BattleController {
    async create(req, res, next) {
        try {
            let {reward, attacking, defending} = req.body
            if (reward && attacking && defending) {
                let question = []
                await TestQuestion.findAll({ order: Sequelize.literal('rand()'), limit: 5 }).then((encounters) => {
                    for (let i = 0; i < encounters.length; i++) {
                        question.push(encounters[i].dataValues.id)
                    }
                });
                console.log(question)
                const questionIds = JSON.stringify(question)
                const item = await Battle.create({reward, attacking, defending, questionIds})
                return res.json(item)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getUserBattles(req, res, next) {
        try {
            let {userId} = req.query
            if (userId) {
                const attackingBattles = await Battle.findAll({where: {attacking: userId}})
                const defendingBattles = await Battle.findAll({where: {defending: userId}})
                const resBattles = {
                    "attackingBattles": attackingBattles,
                    "defendingBattles": defendingBattles
                }
                return res.json(resBattles)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getBattle(req, res, next) {
        try {
            let {battleId} = req.query
            if (battleId) {
                const battle = await Battle.findOne({where: {id: battleId}})
                return res.json(battle)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async confirmBattle(req, res, next) {
        try {
            let {battleId, userId, time, correctAnswers} = req.body
            if (battleId && userId && time && correctAnswers) {
                const battle = await UserResult.create({battleId, userId, time, correctAnswers})
                return res.json(battle)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async createQuestion(req, res, next) {
        try {
            let {title, description, answers, correctAnswer} = req.body
            if (title && description) {
                answers = JSON.stringify(answers)
                const question = await TestQuestion.create({title, description, answers, correctAnswer})

                return res.json(question)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAllQuestion(req, res, next) {
        try {
            const question = await TestQuestion.findAll()
            return res.json(question)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getQuestion(req, res, next) {
        try {
            let {questionId} = req.query

            if (questionId) {
                const question = await TestQuestion.findOne({where: {id: questionId}})
                question.answers = JSON.parse(question.answers)
                return res.json(question)
            } else {
                return next(ApiError.badRequest({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteQuestion(req, res, next) {
        try {
            let {questionId} = req.body
            if (questionId) {
                const question = await TestQuestion.destroy({where: {id: questionId}})
                return res.json(question)
            } else {
                return next(ApiError.badRequest('Не заданы параметры'))
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BattleController()