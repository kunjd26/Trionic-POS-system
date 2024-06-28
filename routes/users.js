import express from 'express';

import user from '../controllers/User.js';
import userCreateRequest from '../requests/UserCreate.js';
import validateUserSigninRequest from '../requests/UserSignin.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkUserid from '../middlewares/CheckUserid.js';
import validateUserUpdateRequest from '../requests/UserUpdate.js';
import checkEmailIsTaken from '../middlewares/CheckEmailIsTaken.js';

const router = express.Router();

router.route('/')
    .post([userCreateRequest, checkToken, checkPermission('user:c'), checkEmailIsTaken], user.store)
    .get([checkToken, checkPermission('user:r')], user.show)

router.route('/:userid')
    .get([checkToken, checkPermission('user:r'), checkUserid], user.show)
    .put([validateUserUpdateRequest, checkToken, checkPermission('user:u'), checkUserid, checkEmailIsTaken], user.update)
    .delete([checkToken, checkPermission('user:d'), checkUserid], user.destroy);

router.post('/signin', [validateUserSigninRequest], user.signin);
router.post('/signout', [checkToken], user.signout);

export default router;
