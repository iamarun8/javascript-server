const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@successive.tech$/;


export default function ValidateEmail(email) {
    return reg.test(email);
}