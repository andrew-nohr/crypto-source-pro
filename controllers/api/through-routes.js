const router = require('express').Router();
const { Wallet, User, Coin, Coins_Wallet } = require('../../models');

// NOTE DELETING A COINS_WALLET DELTES THE ASSOCIATED USER AND WALLET

// route: /api/through
router.get('/', (req, res) => {
    Coins_Wallet.findAll({
        attributes: ['WalletId', 'CoinId', 'count'],
    })
    .then(dbThroughData => res.json(dbThroughData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/through/1
router.get('/:id', (req, res) => {
    Coins_Wallet.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbThroughData => {
        if (!dbThroughData) {
            res.status(404).json({ message: 'Nothing found with this id' });
            return;
        }
        res.json(dbThroughData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Coins_Wallet.upsert({
        WalletId: req.body.WalletId,
        CoinId: req.body.CoinId,
        count: req.body.count
    })
    .then(dbThroughData => res.json(dbThroughData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// DELETE /api/through/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbThroughData => {
        if (!dbThroughData) {
            res.status(404).json({ message: 'Nothing found with this id' });
            return;
        }
        res.json(dbThroughData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;