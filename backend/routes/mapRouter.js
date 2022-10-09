const Router = require('express')
const router = new Router()
const mapController = require('../controllers/mapController')

router.get('/', mapController.getUserMap)
router.put('/update-cell', mapController.updateCell)


module.exports = router