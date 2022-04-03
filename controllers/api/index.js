const router = require('express').Router();

const userRoutes = require('./user-routes');
const walletRoutes = require('./wallet-routes');
const coinRoutes = require('./coin-routes');

router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/coins', coinRoutes);

module.exports = router;