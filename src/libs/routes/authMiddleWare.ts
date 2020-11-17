import * as jwt from 'jsonwebtoken';
import hasPermission from './permissions';

export default (module: any, permissionType: string) => (req, res, next) => {
    try {
        let token, decodedUser
        console.log("The config is", module, permissionType);
    
        try{
            console.log("Header is",req.headers['authorization'])
            token = req.headers['authorization']
            decodedUser = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456')
            console.log('User', decodedUser);    
        }
        catch(err){
            next({
                error: 'Unauthorised',
                code: 403
            });
        }
    
        const result = hasPermission(module, decodedUser.role, permissionType);
        if(result == true)
        {
            console.log("Authorized Successfully");
            next();
        }
        else{
            next({
                error: 'Unauthorised',
                code: 403
            });
        
        }
    }

    catch(err){
        next({
            error: err,
            code: 403
        });
    }
}