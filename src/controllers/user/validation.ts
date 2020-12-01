const config = {
    create:
    {
        // id:
        // {
        //     required: true,
        //     string: true,
        //     in: ['body'],
        //     custom: function (value) {
        //         console.log('Value', value);
        //         throw {
        //             error: 'Error Occured',
        //             message: 'Message'
        //         }
        //     }
        // },
        name:
        {
            required: true,
            // regex: /^[0-9a-zA-Z]+$/,
            string: true,
            in: ['body'],
            errorMessage: 'Name is required',
        },
        email: {
            required: true,
            regex: '',
            in: ['body'],
            errorMessage: 'Email is required',
        },
        role: {
            required: true,
            string: true,
            in: ['body'],
            errorMessage: 'Role is required',
        },
        password: {
            required: true,
            alphaNumeric: true,
            in: ['body'],
            errorMessage: 'Password is required',
        }
    },

    delete:
    {
        id:
        {
            required: true,
            errorMessage: 'Id is required',
            in: ['params']
        }
    },

    get:
    {
        skip:
        {
            required: false,
            default: 10,
            number: true,
            in: ['query'],
            errorMessage: 'Skip is invalid',
        },
        limit:
        {
            required: false,
            default: 20,
            number: true,
            in: ['query'],
            errorMessage: 'Limit is invalid',
        }
    },

    update:
    {
        id:
        {
            required: true,
            string: true,
            in: ['body']
        },
        dataToUpdate:
        {
            in: ['body'],
            required: true,
            isObject: true,
            custom: function (dataToUpdate) { },
        }
    },

    login: 
    {
        email:
        {
            required: true,
            string: true,
            in: ['body']
        },
        password:
        {
            required: true,
            string: true,
            in: ['body']
        }
    }
}

export default config;