import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {
    static instance: TraineeController

    static getInstance() {
        if (TraineeController.instance) {
            return TraineeController.instance;
        }

        TraineeController.instance = new TraineeController();
        return TraineeController.instance;
    }

    userRepository: UserRepository = new UserRepository();

    get = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside get method of Trainee controller");
            this.userRepository.find({ deletedAt: undefined }, {}, {})
                .then((resp) => {
                    console.log('Response is', resp);
                    res.send({
                        message: "Trainee fetched Successfully",
                        data: resp
                    });
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    create = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside create method of Trainee controller");
            this.userRepository.create(req.body)
                .then((resp) => {
                    console.log('Response is', resp);
                    res.send({
                        message: "Trainee created Successfully",
                        data: resp
                    });
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    update = (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside update method of Trainee controller");
            console.log("in update api : ", req.body.dataToUpdate);
            const data = { originalId: req.body.id, dataToUpdate: req.body.dataToUpdate }
            this.userRepository.update(data)
                .then((resp) => {
                    console.log('Response is', resp);
                    if (resp) {
                        res.send({
                            message: "Trainee updated Successfully",
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
            console.log("Inside delete method of Trainee controller");
            this.userRepository.delete(req.params.id)
                .then((resp) => {
                    console.log('Response is', resp);
                    if (resp != undefined) {
                        res.send({
                            message: "Trainee deleted Successfully",
                            data: resp
                        });
                    }
                    else {
                        next({
                            message: 'No Trainee Found',
                            code: 404
                        });
                    }
                })
        } catch (err) {
            console.log("Inside err", err);
        }
    }


}

export default TraineeController.getInstance();