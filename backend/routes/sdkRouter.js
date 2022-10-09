const Router = require('express')
const router = new Router()
const sdkController = require('../controllers/sdkController')


router.post('/transfer-matic', sdkController.transferMatic)
router.post('/transfer-coins', sdkController.transferCoins)
router.post('/transfer-nft', sdkController.transferNFT)
router.post('/nft-info', sdkController.walletNFTInfo)
router.get('/nft-balance', sdkController.walletBalanceNFT)
router.post('/history', sdkController.walletHistory)
router.get('/coins-balance', sdkController.walletBalanceCoins)
router.post('/generate-nft', sdkController.generateNFT)


module.exports = router