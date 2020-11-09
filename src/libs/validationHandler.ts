export default (config) => (req, res, next) => {
    const errors = [];
    console.log('Inside ValidationHandler Middleware');
    console.log('body -->', req.body);
    console.log('query -->', req.query);

    const keys = Object.keys(config);

    keys.forEach((key) => {
        const obj = config[key];
        console.log('key is :', key);
        const [values] = obj.in.map((val) => {
            return req[val][key];
        });

        // console.log("Keys are : ",keys);
        // console.log("values are : ",values);

        // for required
        if (obj.required)
        {
            // if required -> true check for Body and Query
            // console.log("Length of key -> ",Object.keys(req[obj.in]).length)
            if (Object.keys(req[obj.in]).length === 0) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `Values must be passed through ${obj.in}`,
                });
            }

            // if required -> true check for string
            // console.log("is string ->", obj.string)
            if (obj.string) {
                if (!(typeof (values) === 'string')) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} must be string`,
                    });
                }
            }

            // if required -> true check for number
            // console.log("is number ->",obj.number);
            if (obj.number) {
                if (isNaN(values) || values === undefined) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key}  must be number`,
                    });
                }
            }

            // if required is -> true check for regex
            // console.log("is regex ->",obj.regex);
            if (obj.regex) {
                // console.log("Inside regex function",values);
                const regex = obj.regex;
                if (!regex.test(values)) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} is not valid expression`,
                    });
                }
            }
            
            // if required is -> true check for object
            // console.log("is object ->",obj.isObject)
            if (obj.isObject) {
                if (!(typeof (values) === 'object')) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} Should be an object`,
                    });
                }
            }

            // if required is true check for null
            // console.log("is Null", isNull(values));
            if (isNull(values)) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} is required`,
                });
            }
        }

        if (!obj.required) {
            console.log("Default : ", obj.default);
            if (obj.default) {
                if (isNull(values)) {
                    values === obj.default;
                }
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