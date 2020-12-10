import { Router } from 'express';

import traineeController from './Controller';
import validationHandler from '../../libs/validationHandler';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';

const traineeRouter = Router();


/**
 * @swagger
 *
 *  definitions:
 *      TraineeCreate:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: Arun@successive.tech
 *          name:
 *              type: string
 *              example: Arun Kumar
 *          password:
 *              type: string
 *              example: Arun@123
 *          role:
 *               type: string
 *               example: trainee
 *      TraineeResponse:
 *        type: object
 *        properties:
 *          _id:
 *              example: 5e4a36bc64824b1f80b730cd
 *          email:
 *              type: string
 *              example: Arun@successive.tech
 *          name:
 *              type: string
 *              example: Arun
 *          role:
 *              type: string
 *              example: trainee
 *          originalId:
 *              example: 3098cgp49d786m32e34
 *          createdAt:
 *              example: 2020-12-20T11:15:04.34
 *      Unauthorized:
 *        type: object
 *        properties:
 *          error:
 *              example: Unauthorized
 *          message:
 *              example: Token not found
 *          status:
 *              example: 403
 *          timestamp:
 *               example: 2020-12-03T14:22:02
 *
 */


traineeRouter.route('/')
/**
 * @swagger
 *
 * /api/trainee:
 *   get:
 *     tags:
 *       - Trainee
 *     description: List of all the trainees
 *     security:
 *       - Bearer: []
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of records to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: number of records to show
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: Parameter to sort (name or email)
 *         in: query
 *         required: false
 *         type: string
 *       - name: sortedBy
 *         description: Elements to sort By(sorting order)
 *         in: query
 *         required: false
 *         type: string
 *       - name: search
 *         description: Element to search
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Trainee List
 *         schema:
 *              properties:
 *                  status:
 *                      example: OK
 *                  message:
 *                      example: 'Trainee Fetched Successfully'
 *                  TotalCount:
 *                      example: 9
 *                  TraineeCount:
 *                      example: 6
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */

    .get(authMiddleWare('getUsers', 'read'),validationHandler(validation.get), traineeController.getAll)

/**
* @swagger
*
* /api/trainee:
*   post:
*     tags:
*       - Trainee
*     description: Returns the success reponse on creation
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*       - name: User
*         description: Data of users.
*         in: body
*         required: true
*         type: object
*         schema:
*             $ref: '#/definitions/TraineeCreate'
*     responses:
*       200:
*         description: User Created Successfully
*         schema:
*              oneOf:
*              properties:
*                  status:
*                      example: OK
*                  message:
*                      example: Trainee Created Successfully
*                  data:
*                      type: object
*                      allOf:
*                          - $ref: '#/definitions/TraineeResponse'
*                      properties:
*                              name:
*                                  type: string
*                                  example: "Arun"
*       403:
*         description: unauthorised access
*         schema:
*              $ref: '#/definitions/Unauthorized'
*/

    .post(authMiddleWare('getUsers', 'write'),validationHandler(validation.create), traineeController.create)
/**
* @swagger
*
* /api/trainee:
*   put:
*     tags:
*       - Trainee
*     description: Returns the success reponse on Updation
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*       - name: User
*         description: Data of users.
*         in: body
*         required: true
*         type: object
*         schema:
*          oneOf:
*          properties:
*              id:
*                  example: 29834ucuncnuc847383u8nc929c
*                  allOf:
*                      - $ref: '#/definitions/TraineePost'
*     responses:
*       200:
*         description: User Updated Successfully
*         schema:
*              oneOf:
*              properties:
*                  status:
*                      example: OK
*                  message:
*                      example: successfully upddate
*                  data:
*                      type: object
*                      allOf:
*                          - $ref: '#/definitions/TraineeResponse'
*       403:
*         description: unauthorised access
*         schema:
*              $ref: '#/definitions/Unauthorized'
*/
    .put(authMiddleWare('getUsers', 'write'),validationHandler(validation.update), traineeController.update)
/**
* @swagger
*
* /api/trainee/{id}:
*   delete:
*     tags:
*       - Trainee
*     description: Returns the success reponse on deletion
*     security:
*       - Bearer: []
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         description: OriginalID deleted.
*         in: query
*         required: true
*         type: string
*         example: uw89ww9e2039j8821b9h89974b
*     responses:
*       200:
*         description: Data to be deleted
*         schema:
*              oneOf:
*              properties:
*                  status:
*                      example: OK
*                  message:
*                      example: Trainee deleted successfully!
*                  code:
*                      example: 200
*       403:
*         description: unauthorised access
*         schema:
*              $ref: '#/definitions/Unauthorized'
*/
    traineeRouter.route('/:id').delete(authMiddleWare('getUsers', 'delete'),validationHandler(validation.delete), traineeController.delete)


export default traineeRouter; 