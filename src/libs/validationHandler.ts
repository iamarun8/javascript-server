export default (config) => (req, res, next) => {
    const errors = [];
    console.log('Inside ValidationHandler Middleware');
    console.log('body -->', req.body);
    console.log('query -->', req.query);
    // console.log('object length :',Object.keys(req.query).length);
    const keys = Object.keys(config);
    // console.log('This is the keys :-->', keys);

    keys.forEach((key) => {
        const obj = config[key];
        // console.log('Object structure is :-->', obj);
        console.log('key is :', key);
        const values = obj.in.map((val) => {
            return req[val][key];
        });
        console.log('values is :', values);
        // console.log('arrays of key : ', Object.keys(req[obj.in]));
        // console.log('Object length : ', Object.keys(req[obj.in]).length);

        // for Body and Query
        if (Object.keys(req[obj.in]).length === 0) {
            errors.push({
                key: { key },
                location: obj.in,
                message: obj.errorMessage || `Values must be passed through ${obj.in}`,
            });
        }

        // for required
        // console.log('obj required : ', obj.required);
        if (obj.required) {
            if (isNull(values[0])) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} is required`,
                });
            }
        }
        // for default
        else {
            console.log("Default : ", obj.default);
            if (obj.default) {
                if (isNull(values[0])) {
                    values[0] === obj.default;
                }
            }
        }

        // for string
        // console.log('string is : ', obj.string);
        if (obj.string) {
            if (!(typeof (values[0]) === 'string')) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} must be string`,
                });
            }
        }

        // for object
        // console.log('Object is : ', obj.isObject);
        if (obj.isObject) {
            if (!(typeof (values[0]) === 'object')) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} Should be an object`,
                });
            }
        }

        // for regex
        // console.log('Regex is : ', obj.regex);
        if (obj.regex) {
            const regex = obj.regex;
            if (!regex.test(values[0])) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} is not valid expression`,
                });
            }
        }

        
        
        // for number
        // console.log('number : ', obj.number);
        if (obj.number) {
            if (isNaN(values[0]) || values[0] === undefined) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key}  must be number`,
                });
            }
        }
    });
    if (errors.length > 0) {
        res.status(400).send({ errors });
    }
    else {
        next();
    }
};

function isNull(obj) {
    const a = (obj === undefined || obj === null);
    return a;
}