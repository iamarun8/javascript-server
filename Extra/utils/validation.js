import ValidateEmail  from "./helpers";

let valid = [];
let invalid = [];
export default function ValidateUser(users) {
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

