import { Ipermission, IUsers } from './interfaces';
export const permissions: Ipermission = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: []
    }
}

export const users: IUsers[] = [
    {
        traineeEmail: 'trainee1@@successive.tech',
        reviewerEmail: 'reviewer1@successive.tech',
    },
    {
        traineeEmail: 'trainee2@successive.tech',
        reviewerEmail: 'reviewer2@successive.tech',
    },
    {
        traineeEmail: 'trainee3@@successive.tech',
        reviewerEmail: 'reviewer3@successive.tech',
    },
    {
        traineeEmail: 'trainee4@successive.tech',
        reviewerEmail: 'reviewer4@successive.tech',
    }
]