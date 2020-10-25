let permissions = {
    'getUsers': {
        'all': ['head-trainer'],
        'read': ['trainee', 'trainer'],
        'write': ['trainer'],
        'delete': [],
    }
}

function hasPermission(moduleName, role, permissionType) {

    if (permissions[moduleName] !== undefined) {
        console.log("Module Name found")
        if (permissions[moduleName][permissionType] !== undefined) {
            console.log("Permission Type found")
            if (permissions[moduleName][permissionType] !== 'all') {
                if (permissions[moduleName]['all'].indexOf(role) !== -1) {
                    console.log("Role found")
                    return true;
                }
            }
            if (permissions[moduleName][permissionType].length > 0) {
                if (permissions[moduleName][permissionType].indexOf(role) !== -1) {
                    console.log("Role found")
                    return true;
                }
                else {
                    console.log("Role not found")
                    return false;
                }
            }
            else {
                console.log("No role available for delete")
                if (role === '') {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        else {
            console.log("Permission Type not found")
            return false;
        }
    }
    else {
        console.log("Module Name is not found")
        return false;
    }
}



console.log(hasPermission('getUsers', 'head-trainer', 'delete'));
/*---------------  test cases ---------------------*/
// console.log(hasPermission('getUsers', 'trainee', 'read'));
// console.log(hasPermission('getUsers', 'trainee', 'delete'));
// console.log(hasPermission('getUsers', 'trainer', 'delete'));

