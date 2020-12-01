import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';


export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    
    public static generateObjectID() {
        return String(mongoose.Types.ObjectId());
    }


    public find(query, projection?: any, options?: any): any {
        return userModel.find(query, projection, options);
    }

    public static findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public static create(data): Promise<IUserModel> {
        console.log('UserRepository create', data);
        const id = UserRepository.generateObjectID();
        const model = new userModel({
            _id: id,
            ...data,
        });
        return model.save();
    }

    public static count() {
        return userModel.countDocuments();
    }

    public update(data: any): Promise<IUserModel> {
        console.log('UserRepository:: update', data);
        return super.update(data);
    }
}
// export default new UserRepository();

