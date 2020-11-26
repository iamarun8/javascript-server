import { Request, Response, NextFunction } from 'express';

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
            console.log("Inside get method of User controller");
            res.send({
                message: "User fetched Successfully",
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
            console.log("Inside create method of User controller");
            res.send({
                message: "User created Successfully",
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
            console.log("Inside update method of User controller");
            res.send({
                message: "User updated Successfully",
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
            console.log("Inside delete method of User controller");
            res.send({
                message: "User deleted Successfully",
                data: {
                    name: "Monty",
                    address: "Delhi"
                }
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }
}

export default UserController.getInstance();