import { Router } from 'express';

import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { config } from 'dotenv/types';
import { authMiddleWare } from '../../libs/routes';

const traineeRouter = Router();

traineeRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'),validationHandler(validation.get), traineeController.get)
    .post(authMiddleWare('getUsers', 'write'),validationHandler(validation.create), traineeController.create)
    .put(authMiddleWare('getUsers', 'delete'),validationHandler(validation.update), traineeController.update)
    traineeRouter.route('/:id').delete(authMiddleWare('getUsers', 'read'),validationHandler(validation.delete), traineeController.delete)

export default traineeRouter;