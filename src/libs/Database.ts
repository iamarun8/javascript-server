import * as mongoose from 'mongoose';
import seedData from './seedData';

class Database {
    static open(mongoURL) {
        return new Promise((resolve, reject) => {
            console.log('Inside open method');
            mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                seedData();
                resolve(null);
            })

        })
    }

    static disconnect() {
        console.log('Inside disconnect');
        mongoose.connection.close();
    }
}

export default Database;