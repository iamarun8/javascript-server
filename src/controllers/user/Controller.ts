import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../repositories/user/UserModel';
import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import config from '../../config/configuration'
import UserRepository from '../../repositories/user/UserRepository';

class UserController {
    static instance: UserController

    static getInstance() {
        if (UserController.instance) {
            return UserController.instance;
        }

        UserController.instance = new UserController();
        return UserController.instance;
    }

    userRepository: UserRepository = new UserRepository();

    get = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside get method of User controller");
            this.userRepository.find({ deletedAt: undefined }, {}, {})
                .then((resp) => {
                    console.log('Response is', resp);
                    res.send({
                        message: "User fetched Successfully",
                        data: resp
                    });
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside create method of User controller");
            this.userRepository.create(req.body)
                .then((resp) => {
                    console.log('Response is', resp);
                    res.send({
                        message: "User created Successfully",
                        data: resp
                    });
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside update method of User controller");
            console.log("in update api : ", req.body.dataToUpdate);
            const data = { originalId: req.body.id, dataToUpdate: req.body.dataToUpdate }
            this.userRepository.update(data)
                .then((resp) => {
                    console.log('Response is', resp);
                    if (resp) {
                        res.send({
                            message: "User updated Successfully",
                            data: resp
                        });
                    }
                    else {
                        next({
                            message: 'Error in Updating',
                            code: 404
                        })
                    }
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    delete = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside delete method of User controller");
            this.userRepository.delete(req.params.id)
                .then((resp) => {
                    console.log('Response is', resp);
                    if (resp != undefined) {
                        res.send({
                            message: "User deleted Successfully",
                            data: resp
                        });
                    }
                    else {
                        next({
                            message: 'No User Found',
                            code: 404
                        });
                    }
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    login(req: Request, res: Response, next: NextFunction) {
        try {
            const secretKey = config.PRIVATE_KEY;
            const { email, password } = req.body;
            console.log('email is :---', email);
            console.log('password is :---', password);
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
