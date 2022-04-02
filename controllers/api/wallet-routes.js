const router = require('express').Router();
const { Wallet, User } = require('../../models');

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

module.exports = router;