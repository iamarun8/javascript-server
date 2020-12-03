import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import config from '../../config/configuration'
import UserRepository from '../../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import { userModel } from '../../repositories/user/UserModel';

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

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside get method of User controller");
            const resp = await this.userRepository.find({ deletedAt: undefined }, {}, {})
            console.log('Response is', resp);
            res.send({
                message: "User fetched Successfully",
                data: resp
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside create method of User controller");
            const resp = await this.userRepository.create(req.body)
                    console.log('Response is', resp);
                    res.send({
                        message: "User created Successfully",
                        data: resp
                    });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside update method of User controller");
            console.log("in update api : ", req.body.dataToUpdate);
            const data = { originalId: req.body.id, dataToUpdate: req.body.dataToUpdate }
            const resp = await this.userRepository.update(data)
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
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside delete method of User controller");
            const resp = await this.userRepository.delete(req.params.id)
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
        } catch (err) {
            console.log("Inside err", err);
        }
    }


    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const secretKey = config.PRIVATE_KEY;
            const { email, password } = req.body;
            await userModel.findOne({ email: req.body.email }, (err, result) => {
                if (result) {
                    console.log('result.password =', result.password, '- and - password =', password);
                    console.log('bcrypt password =>', bcrypt.compareSync(password, result.password));
                    // if ((email === result.email) && bcrypt.compareSync(password, result.password)) {
                    if ((email === result.email) && (password === result.password)) {
                        const token = jwt.sign({ result }, secretKey, { expiresIn: '20m' });
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
