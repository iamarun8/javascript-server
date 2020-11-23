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

    get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Inside get method of Trainee controller");
            res.send({
                message: "Trainee fetched Successfully",
                data: [
                    {
                        name: "Arun",
                        address: "Noida"
                    }
                ]
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    create(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Inside create method of Trainee controller");
            res.send({
                message: "Trainee created Successfully",
                data: {
                    name: "Lakshay",
                    address: "Ghaziabad"
                }
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    update(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Inside update method of Trainee controller");
            res.send({
                message: "Trainee updated Successfully",
                data: {
                    name: "Rudraksh",
                    address: "Greater Noida"
                }
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    delete(req: Request, res: Response, next: NextFunction) {
        try {
            console.log("Inside delete method of Trainee controller");
            res.send({
                message: "Trainee deleted Successfully",
                data: {
                    name: "Monty",
                    address: "Delhi"
                }
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    login(req: IRequest, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            
            userModel.findOne({ email: req.body.email }, (err, result) => {
                if (result) {
                    if (password === result.password) {
                        console.log('result is', result.password);
                        const token = jwt.sign({ result }, config.PRIVATE_KEY);
                        console.log(token);
                        res.send({
                            data: token,
                            message: 'Login Permitted',
                            status: 200
                        });
                    }
                    else {
                        res.send({
                            message: 'password doesn\'t match',
                            status: 400
                        });
                    }
                } else {
                    res.send({
                        message: ' Email is not registered ',
                        status: 404
                    });
                }
            });
        }
        catch (err) {
            res.send(err);
        }

    }
    me(req: IRequest, res: Response, next: NextFunction) {
        res.json({
            message: 'Authorized Successfully'
        });
    }

}

export default UserController.getInstance();