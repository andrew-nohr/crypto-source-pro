const router = require('express').Router();
const { Wallet, User } = require('../../models');

// route: /api/wallet
router.get('/', (req, res) => {
    Wallet.findAll({
        attributes: ['id', 'name'],
        include: [
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

// route: /api/wallet/:id
router.get('/:id', (req, res) => {
    Wallet.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'name'
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