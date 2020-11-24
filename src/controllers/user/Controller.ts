import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../repositories/user/UserModel';
import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import config from '../../config/configuration'

class UserController {
    static instance: UserController

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }

        UserController.instance = new UserController();
        return UserController.instance;
    }

    login(req: Request, res: Response, next: NextFunction) {
        try {
            const secretKey = config.PRIVATE_KEY;
            const { email, password } = req.body;

            userModel.findOne({ email: req.body.email }, (err, result) => {
                if (result) {
                    if ((email === result.email) && (password === result.password)) {
                        const token = jwt.sign({ result }, secretKey);
                        res.send({
                            data: token,
                            message: 'Login Permited',
                            code: 200
                        });
                    }
                    else {
                        console.log('database data', result.password, result.email);
                        next({
                            message: 'Check Your Credentials',
                            error: 'Authentication Failed',
                            code: 400
                        });
                    }
                }
                else {
                    next({
                        message: 'Email is not Registered',
                        error: 'Authentication Failed',
                        code: 404
                    });
                }
            });
        }
        catch (err) {
            res.send(err);
        }
    }
    me(req: IRequest, res: Response, next: NextFunction) {
        const data = res.locals.user;
        res.json({
            data,
            message: 'Authorized Successfully'
        });
    }

}

export default UserController.getInstance();