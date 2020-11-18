import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';

export default class UserRepository {
    public static generateObjectId() {
        return String(mongoose.Types.ObjectId());
    }

    public create(data: any): Promise<IUserModel> {
        console.log('userRepository:: create', data);
        const id = UserRepository.generateObjectId();
        const model = new userModel({
            _id: id,
            ...data,
        });
        return model.save();
    }

    public count() {
        return userModel.countDocuments();
    }
}