import * as express from 'express';
import UserController from './Controller';
import authmiddleware from '../../libs/routes/authMiddleWare';
import validationHandler from '../../libs/validationHandler';
import config from './validation';
const UserRouter = express.Router();
/**
 * @swagger
 *
 *  definitions:
 *      me:
 *        type: object
 *        properties:
 *          message:
 *              type: string
 *              example: Me
 *          status:
 *              type: string
 *              example: OK
 *          data:
 *              iss: Online JWT Builder
 *              iat: 1305042360
 *              exp: 1436544360
 *              name: trainee
 *              email: trainee@successive.tech
 *              role: trainee
 *      Login:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: trainee@successive.tech
 *          password:
 *              type: string
 *              example: training@123
 *      Token:
 *           type: object
 *           properties:
 *               status:
 *                   example: Ok
 *               message:
 *                   example: Success
 *               data:
 *                    example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiX2lkIjoiNWZjOGNjNmM5N2M2N2EzZjg0NzQ4MzZjIiwibmFtZSI6ImhlYWQtdHJhaW5lciIsImVtYWlsIjoiaGVhZHRyYWluZXJAc3VjY2Vzc2l2ZXRlY2giLCJyb2xlIjoiaGVhZC10cmFpbmVyIiwicGFzc3dvcmQiOiIkMmIkMTAkaXZvaWczVE9OM3NBTUNwZVgyUWVYdVU1TjA2eS5helJZYklsbjRUOXd6QVhPRXcydHk5Z0ciLCJvcmlnaW5hbElkIjoiNWZjOGNjNmM5N2M2N2EzZjg0NzQ4MzZjIiwiY3JlYXRlZEF0IjoiMjAyMC0xMi0wM1QxMTozMDo1Mi4xNjlaIiwiX192IjowfSwiaWF0IjoxNjA3NTAzNzcwLCJleHAiOjE2MDc1MDQ2NzB9.MJeritEW86B4fR9Gvp8kIATeDtL42ewhbq9iOSwv5b8
 */


/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     tags:
 *       - User
 *     description: Current user Details.
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of elements to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: Total Data
 *         in: query
 *         required: false
 *         type: number
 *     responses:
 *       200:
 *         description: success
 *         schema:
 *             $ref: '#/definitions/me'
 */
UserRouter.route('/me')
    .get(authmiddleware('getUsers' ,'read'), UserController.me);
/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         schema:
 *             $ref: '#/definitions/Login'
 *     responses:
 *       200:
 *         description: login
 *         schema:
 *              $ref: '#/definitions/Token'
 *       422:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              status:
 *                  example: "200"
 *              message:
 *                  example: Password does not match
 *              err:
 *                  example: Password is incorrect
 */
UserRouter.route('/login')
    .post(validationHandler(config.login), UserController.login);

export default UserRouter;