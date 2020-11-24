import * as express from 'express';
import UserController from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/validationHandler';
import config from './validation';
const UserRouter = express.Router();


UserRouter.route('/me')
    .get(authmiddleware('getUsers' ,'read'), UserController.me);

UserRouter.route('/login')
    .post(validationHandler(config.login), UserController.login);

export default UserRouter;