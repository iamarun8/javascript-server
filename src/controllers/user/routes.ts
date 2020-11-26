import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import UserController from './Controller';


const UserRouter = Router();

UserRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(validation.get), UserController.get )
    .post(authMiddleWare('getUsers', 'write'), validationHandler(validation.create), UserController.create )
    .put(authMiddleWare('getUsers', 'write'), validationHandler(validation.update), UserController.update )
    UserRouter.route('/:id').delete(authMiddleWare('getUsers', 'delete'), validationHandler(validation.delete), UserController.delete)

export default UserRouter; 