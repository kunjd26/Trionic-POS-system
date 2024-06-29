import express from 'express';

import user from '../controllers/User.js';
import validateUserCreateRequest from '../requests/UserCreate.js';
import validateUserSigninRequest from '../requests/UserSignin.js';
import validateUserUpdateRequest from '../requests/UserUpdate.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import checkEmailIsTaken from '../middlewares/CheckEmailIsTaken.js';

const router = express.Router();

router.route('/')
    .post([validateUserCreateRequest, checkToken, checkPermission('user:c'), checkEmailIsTaken], user.store)
    .get([checkToken, checkPermission('user:r')], user.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('user:r'), checkObjectId], user.show)
    .put([validateUserUpdateRequest, checkToken, checkPermission('user:u'), checkObjectId, checkEmailIsTaken], user.update)
    .delete([checkToken, checkPermission('user:d'), checkObjectId], user.destroy);

router.post('/signin', [validateUserSigninRequest], user.signin);
router.post('/signout', [checkToken], user.signout);

export default router;
