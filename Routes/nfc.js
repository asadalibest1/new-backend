import express from "express";
const router = express.Router();
import NfcController from '../Controllers/NfcController';
import * as middleware from '../middleware/authenticate';
import { VerifySubscription } from "../middleware/subscription";

router.post("/createnfc", middleware.authenticateUser,VerifySubscription, NfcController.PostNfc);
router.get("/getsinglenfc", middleware.authenticateUser, NfcController.GetsingleNfc);
router.get("/getnfc", NfcController.GetNfc);
router.post("/createauthor", NfcController.CreateAuthor);
router.post("/createowner", NfcController.CreateOwner);
// router.post("/createcreator",middleware.authenticateUser, NfcController.CreateCreator);
router.post("/postkyc", middleware.authenticateUser,NfcController.PostKyc);
router.post("/postkyb", NfcController.PostKyb);
router.put("/verifyform", NfcController.Verifyform);
router.put("/mintNfc", NfcController.MintNfc);
router.get("/dashboard", NfcController.Dashboard);
export default router;
