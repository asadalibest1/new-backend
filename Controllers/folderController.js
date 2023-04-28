import foldermodel from "../Model/foldermodel";

class FolderController {
    Createfolder = (req, res) => {
        const result = foldermodel.CreateFolder(req);
        result
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((e) => {
            res.status(400).json(e);
          })
      }

      NfcToFolder = (req, res) => {
        const result = foldermodel.NfcToFolder(req);
        result
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((e) => {
            res.status(400).json(e);
          })
      }

      GetFolder = (req, res) => {
        const result = foldermodel.GetFolder(req);
        result
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((e) => {
            res.status(400).json(e);
          })
      }

      NfcMoveOut = (req, res) => {
        const result = foldermodel.NfcMoveOut(req);
        result
          .then((resp) => {
            res.status(200).json(resp);
          })
          .catch((e) => {
            res.status(400).json(e);
          })
      }
}
export default new FolderController();