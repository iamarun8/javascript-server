interface Ipermission {
    'getUsers': {
        all: string[],
        read: string[],
        write: string[],
        delete: string[]
    };
}

interface IUsers {
    traineeEmail: string;
    reviewerEmail: string;
}

export {
    IUsers,
    Ipermission
};