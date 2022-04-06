const router = require("express").Router();
const { Wallet, Coin, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      console.log("user is logged in")
      res.render("wallet");
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
  try {
    const walletData = await Wallet.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const wallets = walletData.map((wallet) => wallet.get({ plain: true }));
    console.log(wallets);
    res.render("wallet", {
      wallets,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
