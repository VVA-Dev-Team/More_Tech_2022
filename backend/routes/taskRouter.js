const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', taskController.create)
router.get('/', taskController.getAll)
router.delete('/',  taskController.delete)
router.post('/confirm', taskController.confirmTask)


module.exports = router