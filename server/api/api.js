var router = require('express').Router();

router.use('/bookings', require('./booking/bookingRoutes'));
router.use('/users', require('./user/user_Routes'));



module.exports = router;
