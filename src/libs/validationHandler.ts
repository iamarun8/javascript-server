export default (config) => (req, res, next) => {
    const errors = [];
    console.log('Inside ValidationHandler Middleware');
    console.log('body -->', req.body);
    console.log('query -->', req.query);

    const keys = Object.keys(config);

    keys.forEach((key) => {
        const obj = config[key];
        console.log('key is :', key);
        let [values] = obj.in.map((val) => {
            return req[val][key];
        });

        // for required
        if (obj.required)
        {
            // if required -> true check for Body and Query
            if (Object.keys(req[obj.in]).length === 0) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `Values must be passed through ${obj.in}`,
                });
            }

            // if required -> true check for string
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
            if (obj.regex) {
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
            if (isNull(values)) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `${key} is required`,
                });
            }
        }

        if (!obj.required) {
            if (obj.default) {
                if (isNull(values)) {
                    values = obj.default;
                }
            }

            if (Object.keys(req[obj.in]).length === 0) {
                errors.push({
                    key: { key },
                    location: obj.in,
                    message: obj.errorMessage || `Values must be passed through ${obj.in}`,
                });
            }

            if (obj.string) {
                if (!(typeof (values) === 'string')) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} must be string`,
                    });
                }
            }

            if (obj.isObject) {
                if (!(typeof (values) === 'object')) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} Should be an object`,
                    });
                }
            }

            if (obj.regex) {
                const regex = obj.regex;
                if (!regex.test(values)) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key} is not valid expression`,
                    });
                }
            }

            if (obj.number) {
                if (isNaN(values) || values === undefined) {
                    errors.push({
                        key: { key },
                        location: obj.in,
                        message: obj.errorMessage || `${key}  must be number`,
                    });
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