const router = require('express').Router();
const { Wallet, User, Coin } = require('../../models');

// route: /api/wallet
router.get('/', (req, res) => {
    Wallet.findAll({
        attributes: ['id', 'name', 'user_id'],
        include: [
            {
                model: Coin,
                as: "owned_coins",
                attributes: ['id', 'acronym', 'name'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route: /api/wallet/currentUser
router.get('/currentUser', (req, res) => {
    console.log(req.session)
    Wallet.findOne({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'user_id'
        ],
        include: [
            {
                model: Coin,
                as: "owned_coins",
                attributes: ['id', 'acronym', 'name'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWalletData => {
        if (!dbWalletData) {
          res.status(404).json({ message: 'No wallet found for logged in user'});
          return;
        }
        res.json(dbWalletData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route: /api/wallet/:id
router.get('/:id', (req, res) => {
    Wallet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'user_id'
        ],
        include: [
            {
                model: Coin,
                as: "owned_coins",
                attributes: ['id', 'acronym', 'name'],
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbWalletData => {
        if (!dbWalletData) {
          res.status(404).json({ message: 'No wallet found with this id' });
          return;
        }
        res.json(dbWalletData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route: /api/wallet/
router.post('/', (req, res) => {
    // expects {name: 'My Wallet', user_id: 1}
    Wallet.create({
      name: req.body.name,
      user_id: req.body.user_id
    })
    .then(dbWalletData => res.json(dbWalletData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;