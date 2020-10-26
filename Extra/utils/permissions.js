const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    }
}
function hasPermission(moduleName, role, permissionType) {
    if (permissions[moduleName]) {
        if (permissions[moduleName].all.includes(role)) {
            console.log("Role : ",role);
            console.log("Permission : ", permissionType);
            return true;
        }
        else {
            const permissionsArray = permissions[moduleName][permissionType];
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
console.log(hasPermission('getUsers', 'head-trainer', 'read'));
// console.log("\n");
// console.log(hasPermission('getUsers', 'trainer', 'read'));
// console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
// console.log(hasPermission('getUsers', 'trainee', 'write'));
// console.log(hasPermission('getUsers', 'trainee', 'delete'));
// console.log(hasPermission('getUsers', 'trainer', 'write'));