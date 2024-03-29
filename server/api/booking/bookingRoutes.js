const router = require('express').Router();
const controller = require('./bookingController');
const auth = require('../../auth/auth');

let checkUser = [auth.decodeToken(), auth.getFreshUser()];
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

module.exports = router;
