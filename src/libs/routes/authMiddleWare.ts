import * as jwt from 'jsonwebtoken';
import hasPermission from './permissions';

export default (module: any, permissionType: string) => (req, res, next) => {
    try {
        console.log("The config is", module, permissionType);
    
        console.log("Header is",req.headers['authorization'])
        const token = req.headers['authorization']
        const decodedUser = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456')
    
        console.log('User', decodedUser);        
        const result = hasPermission(module, decodedUser.role, permissionType);
        if(result == true)
        {
            console.log("Authorized Successfully");
            next();
        }
        else{
            next({
                message: 'Unauthorised',
                status: 403
            });
        
        }
    }

    catch(err){
        next({
            message: err
        });
    }
}