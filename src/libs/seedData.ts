import UserRepository from '../repositories/user/UserRepository';

const userRepository: UserRepository = new UserRepository();
export default () => {
    userRepository.count()
        .then(res => {
            if (res === 0) {
                console.log('Data seeding in progress');
                userRepository.create({
                    name: 'head-trainer',
                    email: 'headtrainer@successivetech',
                    role: 'head-trainer',
                    password: 'training@123'
                });
                userRepository.create({
                    name: 'trainer',
                    email: 'trainer@successivetech',
                    role: 'trainer',
                    password: 'training@123'
                });
            }
        })
        .catch(err => console.log(err));
};