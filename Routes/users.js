import express from "express";
// import { PaymentController } from "../controllers/payment";
const router = express.Router();
import UsersController from '../Controllers/Users';
import * as md from '../middleware/authenticate';

router.post("/verify_metamask", md.walletVerify, UsersController.verifyMetamask);
router.post("/login_with_metamask", md.authenticateMetaMaskEmailPassword, UsersController.loginWithMetamask);
router.post("/signup_with_metamask", md.authenticateMetaMaskEmailPasswordSignup, UsersController.signupWithMetamask);
router.post("/signup_with_email_password", md.authenticateEmailPassword, UsersController.signupWithEmailPassword);
router.post("/login_with_email_password", md.authenticateEmailPassword, UsersController.loginWithEmailPassword);
router.post("/update_profile", UsersController.updateProfile);
router.get("/get_profile", md.authenticateUser, UsersController.getProfile);
router.post("/login_with_gmail", md.authenticateGmail, UsersController.loginWithGmail);
router.post("/forgot_password", md.authenticateEmail, UsersController.forgotPassword);
router.get("/match_otp", md.authenticateOtp, UsersController.matchOtp);
router.post("/reset_password", md.authenticatePassword, UsersController.resetPassword);
router.get("/bounce", UsersController.Bounce);
router.put('/updatewallet', md.walletVerify,UsersController.UpdateWalletAdress)

// router.post('/payment',PaymentController)

export default router;