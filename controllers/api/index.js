const router = require('express').Router();

const userRoutes = require('./user-routes');
const walletRoutes = require('./wallet-routes');
const coinRoutes = require('./coin-routes');
const throughRoutes = require('./through-routes');

router.use('/user', userRoutes);
router.use('/wallet', walletRoutes);
router.use('/coins', coinRoutes);
router.use('/through', throughRoutes);

module.exports = router;