import * as jwt from 'jsonwebtoken';
import hasPermission from './permissions';
import  config  from '../../config/configuration'
import { Request, Response, NextFunction } from 'express';
import UserRepositories from '../../repositories/user/UserRepository'

export default (module: any, permissionType: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let decodeUser: any;

        const token = req.headers['authorization'];
        console.log('token values is here ', config.PRIVATE_KEY);

        decodeUser = jwt.verify(token, config.PRIVATE_KEY);
        console.log('decoderUser is :', decodeUser);
        console.log('email in authMiddleware-----------',decodeUser.result.email);
        console.log('password in authMiddleware-----------',decodeUser.result.password);
        const data = await UserRepositories.findOne({ email: decodeUser.result.email, password: decodeUser.result.password })
        if (!data) {
            next({
                message: 'User is empty',
                error: 'Authetication failed',
                code: 403
            });
        }
        res.locals.user = data;
        if (!data.role) {
            next({
                message: 'role not found',
                error: 'Authentication Failed',
                code: 403
            });
            return;
        }

        if (!hasPermission(module, data.role, permissionType)) {
            return next({
                message: `${data.role} does not have ${permissionType} permission in ${module}`,
                error: 'unauthorized',
                code: 403
            });
        }
        next();
    }
    catch (err) {
        next({
            message: 'User is Invalid',
            error: 'Authentication Failed',
            code: 403
        });
        return;
    }
};
