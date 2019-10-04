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
    //.put(checkUser, controller.put)
    /*
    Da den ikke kunne finde /changePassword routen så har jeg prøvet med denne route,
    men det ser ikke ud til at den bruger metoden changePassword
    */
    //.put(controller.changePassword)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete);

//Når jeg prøver at bruge denne route så giver den mig en 404 fejl
/*router.route('/changePassword/:id')

    .put(controller.changePassword);*/

module.exports = router;
