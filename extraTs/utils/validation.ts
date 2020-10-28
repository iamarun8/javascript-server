import { IUsers } from '../interfaces';
import ValidateEmail  from './helpers';

const valid: IUsers[] = [];
const invalid: IUsers[] = [];
export default function ValidateUser(users: IUsers []): void {
    for ( const i of users ) {
        if (ValidateEmail(i.traineeEmail) && ValidateEmail(i.reviewerEmail)) {
            // console.log(`type of traineeEmail is ${typeof(users[i])}`)
            valid.push(i);
        }
        else {
            invalid.push(i);
        }
    }
    console.log('valid count is : ', valid.length);
    console.log(valid);
    console.log('Invalid count is : ', invalid.length);
    console.log(invalid);

}

