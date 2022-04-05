const router = require("express").Router();
const { Wallet, Coin } = require("../models");

router.get("/", async (req, res) => {
  try {
    const walletData = await Wallet.findAll({
      include: [
        {
          model: Coin,
          attributes: ["filename", "description"],
        },
      ],
    });

    const wallets = walletData.map((wallet) => wallet.get({ plain: true }));
    console.log(wallets);
    res.render("homepage", {
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
