const Router = require('express')
const router = new Router()
const shopRouter = require('./shopRouter')
const userRouter = require('./userRouter')
const sdkRouter = require('./sdkRouter')
const mapRouter = require('./mapRouter')
const taskRouter = require('./taskRouter')
const battleRouter = require('./battleRouter')


router.use('/user', userRouter)
router.use('/tokens', sdkRouter)
router.use('/map', mapRouter)
router.use('/shop', shopRouter)
router.use('/task', taskRouter)
router.use('/battles', battleRouter)


module.exports = router