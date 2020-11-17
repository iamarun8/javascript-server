import { permissions as Permissions } from './constants';

export default function hasPermission(moduleName, role, permissionType) {
    if (Permissions[moduleName]) {
        if (Permissions[moduleName].all.includes(role)) {
            console.log("Role : ",role);
            console.log("Permission : ", permissionType);
            return true;
        }
        else {
            const permissionsArray = Permissions[moduleName][permissionType];
            if (permissionsArray) {
                console.log("Role : ", role);
                console.log("Permission : ", permissionType);
                if (permissionsArray.includes(role)) {
                    return true;
                }
                return false;
            }
        }
    }
}
