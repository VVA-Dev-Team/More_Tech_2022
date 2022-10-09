const request = require('request');
const {response} = require("express");
const ApiError = require("../error/ApiError");
const tokenController = require("./tokenController")
const {Cell} = require("../models/models");

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
        try {
            const {fromPrivateKey, toPublicKey, tokenId, toUserId} = req.body
            if (fromPrivateKey, toPublicKey, tokenId) {
                const data = JSON.parse(await tokenController.transferNFT(fromPrivateKey, toPublicKey, tokenId))
                console.log(data)
                if (transaction_hash) {

                    let i = 0
                    while (true) {
                        console.log("while is worked")
                        const options = {
                            'method': 'GET',
                            'url': `https://hackathon.lsp.team/hk/v1/transfers/status/${transaction_hash}`,
                            'headers': {
                                'Accept': 'application/json'
                            }
                        };

                        const {status} = JSON.parse(await new Promise(function (resolve, reject) {
                            request(options, (err, resp, body) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(body);
                                }
                            });
                        }))

                        console.log(status)

                        if (status === "Success") {
                            break
                        }
                        i += 1
                        if (i > 20) {
                            return next(ApiError.badRequest({message: "Ошибка транзакции"}))
                        }
                        await new Promise(r => setTimeout(r, 5000));
                    }
                    const data = await Cell.update({userId: toUserId}, {where: {nftToken: tokenId}})
                    return res.json(data)
                } else {
                    return next(ApiError.badRequest({message: "Ошибка получения хеша"}))
                }

            } else {
                return next(ApiError.internal({message: "Не заданы параметры"}))
            }
        } catch (e) {
            return next(ApiError.internal({message: "Непредвиденная ошибка сервера"}))
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


