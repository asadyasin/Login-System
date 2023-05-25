import { Router } from "express";
import { verifyToken, localVariables } from "../middleware/auth.js"
import { verifyUserName } from "../middleware/verifyUserName.js";

const router = Router();

/** Import All Controllers*/
import { sendEmail } from "../middleware/mailer.js";
import * as controller from '../controller/appController.js';


/** Post Methods */
router.route('/register').post(controller.register);
router.route('/registermail').post(sendEmail);
router.route('/authenticate').post((req,res)=> req.end());
router.route('/login').post(controller.login);
router.route('/logout').post( verifyToken, controller.logout);

/** Get Methods */
router.route('/looggedinusers').get(controller.countLoggedInUsers);
router.route('/user/:username').get(controller.getUser);
router.route('/generateOTP').get(verifyUserName,  localVariables,controller.generateOTP);
router.route('/verifyOTP').get(controller.verifyOTP);
router.route('/createResetSession').get(controller.createResetSession);

/** Put Methods */
router.route('/updateUser').put( verifyToken, controller.updateUser );
router.route('/resetPassword').put(verifyUserName, controller.resetPassword);




export default router;