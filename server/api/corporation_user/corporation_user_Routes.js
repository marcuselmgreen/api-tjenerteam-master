const router = require('express').Router();
const controller = require('./corporation_user_Controller');
const auth = require('../../auth/auth');

let checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

router.route('/changePassword/:id')
    .put(checkUser, controller.changePassword);

module.exports = router;
