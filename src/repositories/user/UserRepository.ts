import * as mongoose from 'mongoose';
import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import VersionableRepository from '../versionable/VersionableRepository';
import * as bcrypt from 'bcrypt'

console.log('Inside User Repository');

export default class UserRepository extends VersionableRepository<IUserModel, mongoose.Model<IUserModel>> {
    constructor() {
        super(userModel);
    }
    
    public static generateObjectID() {
        return String(mongoose.Types.ObjectId());
    }

    public find(query, projection?: any, options?: any): any {
        return super.getAll(query, projection, options);
    }

    public static findOne(query): mongoose.DocumentQuery<IUserModel, IUserModel, {}> {
        return userModel.findOne(query).lean();
    }

    public async create(data: any): Promise<IUserModel> {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(data.password, salt);
        data.password = hashedPassword;
        return await super.create(data);
    }

    public count() {
        return userModel.countDocuments();
    }

    public update(data: any): Promise<IUserModel> {
        console.log('UserRepository:: update', data);
        if (data.dataToUpdate.password) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(data.dataToUpdate.password, salt);
            data.dataToUpdate.password = hashPassword;
        }
        return super.update(data);
    }
}