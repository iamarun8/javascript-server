import * as mongoose from 'mongoose';

class UserSchema extends mongoose.Schema {
    constructor(collection) {
        const baseSchema = Object.assign({
            _id: String,
            name: String,
            email: String,
            role: String,
            password: String
        });
        super(baseSchema, collection);
    }
}

export default UserSchema;