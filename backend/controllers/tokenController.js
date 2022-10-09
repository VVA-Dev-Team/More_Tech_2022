const request = require('request');
const {response} = require("express");
const {Cell} = require("../models/models");
const ApiError = require("../error/ApiError");
const uuid = require("uuid");

class TokenController {
    async createWallet () {
        const options = {
            'method': 'POST',
            'url': 'https://hackathon.lsp.team/hk/v1/wallets/new',
            'headers': {
                'Accept': 'application/json'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async transferMatic (fromPrivateKey, toPublicKey, amount) {
        const options = {
            'method': 'POST',
            'url': 'https://hackathon.lsp.team/hk/v1/transfers/matic',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "fromPrivateKey": fromPrivateKey,
                "toPublicKey": toPublicKey,
                "amount": amount
            })

        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async transferCoins (fromPrivateKey, toPublicKey, amount) {
        const options = {
            'method': 'POST',
            'url': 'https://hackathon.lsp.team/hk/v1/transfers/ruble',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "fromPrivateKey": fromPrivateKey,
                "toPublicKey": toPublicKey,
                "amount": amount
            })

        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async transferNFT (fromPrivateKey, toPublicKey, tokenId) {
        const options = {
            'method': 'POST',
            'url': 'https://hackathon.lsp.team/hk/v1/transfers/nft',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "fromPrivateKey": fromPrivateKey,
                "toPublicKey": toPublicKey,
                "tokenId": tokenId
            })

        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async walletBalanceCoins (publicKey) {
        const options = {
            'method': 'GET',
            'url': `https://hackathon.lsp.team/hk/v1/wallets/${publicKey}/balance`,
            'headers': {
                'Accept': 'application/json'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async walletBalanceNFT (publicKey) {
        const options = {
            'method': 'GET',
            'url': `https://hackathon.lsp.team/hk/v1/wallets/${publicKey}/nft/balance`,
            'headers': {
                'Accept': 'application/json'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async walletNFTInfo (tokenId) {
        var options = {
            'method': 'GET',
            'url': `https://hackathon.lsp.team/hk/v1/nft/${tokenId}`,
            'headers': {
                'Accept': 'application/json'
            }
        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async walletHistory (publicKey, page, offset) {
        var options = {
            'method': 'POST',
            'url': `https://hackathon.lsp.team/hk/v1/wallets/${publicKey}/history`,
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "page": page,
                "offset": offset,
                "sort": "asc"
            })

        };

        return new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        })
    }

    async generateNFT (toPublicKey, uri, nftCount, userId) {
        uri = uuid.v4() + uri
        const options = {
            'method': 'POST',
            'url': 'https://hackathon.lsp.team/hk/v1/nft/generate',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "toPublicKey": toPublicKey,
                "uri": uri,
                "nftCount": nftCount
            })

        };

        const {transaction_hash} = JSON.parse(await new Promise(function(resolve, reject) {
            request(options, (err, resp, body) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            });
        }))

        console.log(transaction_hash)

        if (transaction_hash) {


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
                await new Promise(r => setTimeout(r, 5000));
            }

            const {balance} = JSON.parse(await this.walletBalanceNFT(toPublicKey))

            let tokens
            for (let i = 0; i < balance.length; i++) {
                if (balance[i].uri === uri) {
                    tokens = balance[i].tokens
                    break
                }
            }
            console.log(tokens)

            for (let i = 0; i < tokens.length; i++) {
                const newCell = await Cell.create({
                    userId,
                    nftToken: tokens[i],
                    buildingId: Math.floor(Math.random() * 5)
                })
                console.log(newCell)
            }
            return true
        }
        return false
    }

}

module.exports = new TokenController()


