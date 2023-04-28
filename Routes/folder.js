import express from "express";
import folderController from "../Controllers/folderController";
import * as middleware from '../middleware/authenticate';

const router = express.Router();
router.post("/createfolder",middleware.authenticateUser,folderController.Createfolder);
router.put("/nfctofolder",middleware.authenticateUser,folderController.NfcToFolder);
router.get("/getfolder",middleware.authenticateUser,folderController.GetFolder);
router.put("/moveoutnfc",middleware.authenticateUser,folderController.NfcMoveOut);


export default  router;
