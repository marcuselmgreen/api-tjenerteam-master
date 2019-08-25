var router = require('express').Router();

router.use('/bookings', require('./booking/bookingRoutes'));
router.use('/corporation_users', require('./corporation_user/corporation_user_Routes'));
router.use('/employee_users', require('./employee_user/employee_user_Routes'));


module.exports = router;
