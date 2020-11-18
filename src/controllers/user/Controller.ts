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
}

export default UserController.getInstance();