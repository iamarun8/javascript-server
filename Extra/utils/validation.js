let users = [
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
];

let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function ValidateEmail(email) {
    return reg.test(email);
}

let valid = [];
let invalid = [];
function ValidateUser(users) {
    for (let i = 0; i < users.length; i++) {
        if (ValidateEmail(users[i].traineeEmail) && ValidateEmail(users[i].reviewerEmail)) {
            valid.push(users[i]);
        }
        else {
            invalid.push(users[i]);
        }
    }
    console.log("valid count is : ", valid.length);
    console.log(valid);
    console.log("Invalid count is : ", invalid.length);
    console.log(invalid);

}

ValidateUser(users)
