const router = require("express").Router();

const apiRoutes = require("./api");

// router.use("/api", apiRoutes);

router.use("/test", (req, res) => {
  res.render("main");
});

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
