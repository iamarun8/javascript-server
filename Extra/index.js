import { Diamond, equilateral } from "./Patterns";
import { hasPermission, ValidateUser }  from "./utils";
import { users } from "./constants";



Diamond(5);
equilateral(10);


console.log(hasPermission('getUsers', 'head-trainer', 'read'));
console.log(hasPermission('getUsers', 'trainer', 'delete'));

ValidateUser(users);
