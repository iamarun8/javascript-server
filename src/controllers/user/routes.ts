import * as express from 'express';
import UserController from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import config from './validation';
const UserRouter = express.Router();

UserRouter.route('/')
    .get(authmiddleware('getUsers', 'read'), validationHandler(validation.get), UserController.get)
    .post(authmiddleware('getUsers', 'write'), validationHandler(validation.create), UserController.create)
    .put(authmiddleware('getUsers', 'write'), validationHandler(validation.update), UserController.update)
    UserRouter.route('/:id').delete(authmiddleware('getUsers', 'delete'), validationHandler(validation.delete), UserController.delete)

UserRouter.route('/me')
    .get(authmiddleware('getUsers' ,'read'), UserController.me);

UserRouter.route('/login')
    .post(validationHandler(config.login), UserController.login);

export default UserRouter;