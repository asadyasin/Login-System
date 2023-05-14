import { Router } from "express";
const router = Router();

/** Import All Controllers*/
import * as controller from '../controller/appController.js';


/** Post Methods */
router.route('/register').post(controller.register);
// router.route('/registerMail').post();
router.route('/authenticate').post((req,res)=> req.end());
router.route('/login').post(controller.login);

/** Get Methods */
router.route('/user/:id').get(controller.getUser);
router.route('/generateOTP').get(controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/** Put Methods */
router.route('/updateUser').put(controller.updateUser);
router.route('/resetPassword').put(controller.resetPassword);




export default router;