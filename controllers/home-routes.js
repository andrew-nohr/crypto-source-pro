const router = require("express").Router();
const { Wallet, Coin, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect("wallet/");
    } else {
    res.render("login");
    
    }
    console.log(req.session);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/wallet/", async (req, res) => {
  console.log("Logged in user id is: " + JSON.stringify(req.session))

  Wallet.findOne({
    where: {
      user_id: parseInt(req.session.user_id)
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
        console.log("No wallet with this id: " + req.session.user_id)
        return;
      }
      console.log("Wallet Data " + JSON.stringify(dbWalletData));
      const walletData = dbWalletData.get({ plain: true });
      res.render("wallet", {
        walletData,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/wallet/:id", async (req, res) => {
  try {
    const walletData = await Wallet.findByPk(req.params.id, {
      include: [
        {
          model: Coin,
          attributes: ["id", "acronym", "name"],
        },
      ],
    });

    const wallet = walletData.get({ plain: true });
    res.render("wallet", { wallet });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/coin/:id", async (req, res) => {
  try {
    const walletData = await Coin.findByPk(req.params.id);

    const coin = walletData.get({ plain: true });

    res.render("coin", { coin });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
