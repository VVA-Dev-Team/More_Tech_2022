const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration)
// router.post('/registration', checkRole('ADMIN'), userController.registration)
router.post('/login', userController.login)
router.get('/check', userController.check)
router.get('/all', userController.getAllUsers)


module.exports = router