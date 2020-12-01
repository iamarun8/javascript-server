import VersionableSchema from '../versionable/VersionableSchema'

class UserSchema extends VersionableSchema {
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