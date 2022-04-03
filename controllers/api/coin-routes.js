const router = require('express').Router();
const { Wallet, User, Coin } = require('../../models');

// route: /api/coins
router.get('/', (req, res) => {
    Coin.findAll({
        attributes: ['id', 'acronym', 'name'],
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route: /api/coins/:id
router.get('/:id', (req, res) => {
    Coin.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'acronym',
            'name'
        ],
    })
    .then(dbCoinData => {
        if (!dbCoinData) {
          res.status(404).json({ message: 'No coin found with this id' });
          return;
        }
        res.json(dbCoinData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;