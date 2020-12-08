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

    // get = async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         console.log("Inside get method of Trainee controller");
    //         const resp = await this.userRepository.find({ deletedAt: undefined }, {}, {})
    //         console.log('Response is', resp);
    //         res.send({
    //             message: "Trainee fetched Successfully",
    //             data: resp
    //         });
    //     } catch (err) {
    //         console.log("Inside err", err);
    //     }
    // }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const userRepository = new UserRepository();
            const { skip, limit, sort } = req.query;
            const extractedData = await userRepository.getAll({}, {},
                {
                    limit: Number(limit),
                    skip: Number(skip),
                    sort: { [String(sort)]: 1 },
                    collation: ({ locale: 'en' })
                });

            res.status(200).send({
                message: 'trainee fetched successfully',
                totalCount: await userRepository.count(),
                count: extractedData.length,
                data: [extractedData],
                status: 'success',
            });
        } catch (err) {
            console.log('error: ', err);
        }
    }


    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside create method of Trainee controller");
            const resp = await this.userRepository.create(req.body)
            console.log('Response is', resp);
            res.send({
                message: "Trainee created Successfully",
                data: resp
            });
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside update method of Trainee controller");
            console.log("in update api : ", req.body.dataToUpdate);
            const data = { originalId: req.body.id, dataToUpdate: req.body.dataToUpdate }
            const resp = await this.userRepository.update(data)
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
        } catch (err) {
            console.log("Inside err", err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Inside delete method of Trainee controller");
            const resp = await this.userRepository.delete(req.params.id)
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
        } catch (err) {
            console.log("Inside err", err);
        }
    }


}

export default TraineeController.getInstance();