import UserRepository from '../repositories/user/UserRepository';
import * as bcrypt from 'bcrypt';
import config from '../config/configuration';

const userRepository: UserRepository = new UserRepository()
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(config.PASSWORD, salt);

export default  () => {
    userRepository.count()
        .then(res => {
            if (res === 0) {
                console.log('Data seeding in progress');
                userRepository.create({
                    name: 'head-trainer',
                    email: 'headtrainer@successivetech',
                    role: 'head-trainer',
                    password: hashedPassword
                });
                userRepository.create({
                    name: 'trainer',
                    email: 'trainer@successivetech',
                    role: 'trainer',
                    password: hashedPassword
                });
            }
        })
        .catch(err => console.log(err));
};
