import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';


class UserRepository {
    public static generateObjectID() {
        return String(mongoose.Types.ObjectId());
    }

    public create(data): Promise<IUserModel> {
        console.log('UserRepository create', data);
        const id = UserRepository.generateObjectID();
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
export default new UserRepository();