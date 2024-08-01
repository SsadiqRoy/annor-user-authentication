const express = require('express');

const controller = require('../controllers/userControllers');
const { onlyLoggedIn } = require('../Middlewares/globalMiddleWare');

const router = express.Router();

router.post('/login', controller.login);

router.use(onlyLoggedIn);
router.route('/').post(controller.newUser).patch(controller.update).get(controller.allUsers);
router.get('/logout', controller.logout);
router.get('/authorize', controller.isLoggedIn);
router.patch('/change-password', controller.changePassword);
router.route('/:id').get(controller.oneUser);

module.exports = router;
