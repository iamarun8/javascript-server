import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const userRepository: UserRepository = new UserRepository()

export default  () => {
    userRepository.count()
        .then(res => {
            if (res === 0) {
                console.log('Data seeding in progress');
                userRepository.create({
                    name: 'head-trainer',
                    email: 'headtrainer@successive.tech',
                    role: 'head-trainer',
                    password: config.PASSWORD                  
                });
                userRepository.create({
                    name: 'trainer',
                    email: 'trainer@successive.tech',
                    role: 'trainer',
                    password: config.PASSWORD
                });
            }
        })
        .catch(err => console.log(err));
};
