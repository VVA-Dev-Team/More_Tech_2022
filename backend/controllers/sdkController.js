const request = require('request');
const {response} = require("express");
const ApiError = require("../error/ApiError");
const tokenController = require("./tokenController")

class SdkController {

    async transferMatic (req, res, next) {
        const {fromPrivateKey, toPublicKey, amount} = req.body
        if (fromPrivateKey, toPublicKey, amount) {
            const data = await tokenController.transferMatic(fromPrivateKey, toPublicKey, amount)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async transferCoins (req, res, next) {
        const {fromPrivateKey, toPublicKey, amount} = req.body
        if (fromPrivateKey, toPublicKey, amount) {
            const data = await tokenController.transferCoins(fromPrivateKey, toPublicKey, amount)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async transferNFT (req, res, next) {
        const {fromPrivateKey, toPublicKey, tokenId} = req.body
        if (fromPrivateKey, toPublicKey, tokenId) {
            const data = await tokenController.transferNFT(fromPrivateKey, toPublicKey, tokenId)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }
    }

    async walletBalanceCoins (req, res, next) {
        const {publicKey} = req.query
        if (publicKey) {
            const data = await tokenController.walletBalanceCoins(publicKey)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async walletBalanceNFT (req, res, next) {
        const {publicKey} = req.query
        if (publicKey) {
            const data = await tokenController.walletBalanceNFT(publicKey)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async walletNFTInfo (req, res, next) {
        const {tokenId} = req.body
        if (tokenId) {
            const data = await tokenController.walletNFTInfo(tokenId)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async walletHistory (req, res, next) {
        const {publicKey, page, offset} = req.body
        if (publicKey && page && offset) {
            const data = await tokenController.walletHistory(publicKey, page, offset)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }

    async generateNFT (req, res, next) {
        const {toPublicKey, uri, nftCount, userId} = req.body
        if (toPublicKey && uri && nftCount && userId) {
            const data = await tokenController.generateNFT(toPublicKey, uri, nftCount, userId)
            return res.json(data)
        } else {
            return next(ApiError.internal({message: "Не заданы параметры"}))
        }

    }
}

module.exports = new SdkController()


