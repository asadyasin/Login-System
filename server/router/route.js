import { Router } from "express";
const router = Router();

/** Post Methods */
router.route('/register').post((req,res)=>res.json('Register Route'));
router.route('/registerMail').post();
router.route('/authenticate').post();
router.route('/login').post();

/** Get Methods */
router.route('/user/:id').get();
router.route('/generateOTP').get();
router.route('/verifyOTP').get();
router.route('/createResetSession').get();

/** Put Methods */
router.route('/updateUser').put();
router.route('/resetPassword').put();




export default router;