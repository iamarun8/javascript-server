const permissions = {
    'getUsers': {
        all: ['head-trainer'],
        read: ['trainee', 'trainer'],
        write: ['trainer'],
        delete: [],
    }
}
function hasPermission(moduleName, role, permissionType) {
    for (const [key, value] of Object.entries(permissions)) {
        if (key === moduleName) {
            if (value.all.includes(role)) {
                return true;
            }
            else {
                for (const [key1, value1] of Object.entries(value)) {
                    if (key1 == permissionType) {
                        if (value1.includes(role)) {
                            return true;
                        }
                        return false;
                    }
                    else {
                        continue;
                    }
                }
            }
        }
        else {
            continue;
        }
    }
}
console.log(hasPermission('getUsers', 'head-trainer', 'delete'));

