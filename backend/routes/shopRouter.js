const Router = require('express')
const router = new Router()
const shopController = require('../controllers/shopController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', shopController.create)
router.delete('/', shopController.delete)
router.get('/', shopController.getAll)


module.exports = router