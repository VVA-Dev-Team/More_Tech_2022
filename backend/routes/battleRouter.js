const Router = require('express')
const router = new Router()
const battleController = require('../controllers/battleController')

router.post('/battle', battleController.create)
router.get('/battle/get-user-battles', battleController.getUserBattles)
router.get('/battle', battleController.getBattle)
router.post('/battle/confirm', battleController.confirmBattle)
router.post('/questions', battleController.createQuestion)
router.get('/questions', battleController.getQuestion)
router.get('/questions/all', battleController.getAllQuestion)
router.delete('/questions', battleController.deleteQuestion)


module.exports = router