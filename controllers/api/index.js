const router = require('express').Router();
const userRoutes = require('./userRoutes');
const writingRoutes = require('./writingRoutes');

router.use('/users', userRoutes);
router.use('/writings', writingRoutes);

module.exports = router;