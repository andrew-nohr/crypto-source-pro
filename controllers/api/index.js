const router = require('express').Router();

const userRoutes = require('./user-routes');
const walletRoutes = require('./wallet-routes');

router.use('/users', userRoutes);
router.use('/wallet', walletRoutes);

module.exports = router;