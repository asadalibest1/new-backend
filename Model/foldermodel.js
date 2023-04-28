import FolderSchema from "../schema/folderSchema";
import nfcSchema from "../schema/nfcSchema";
class FolderModel {
  CreateFolder = (req) => {
    return new Promise((resolve, reject) => {
      FolderSchema.find({ Name: req.body.Name })
        .then((res) => {
          if (res.length == 0) {
            let body = {
              ...req.body,
              User: req.query.userId
            }
            const data = new FolderSchema(body);
            data
              .save()
              .then((res) => {
                return resolve({
                  status: 200,
                  data: res,
                });
              })
              .catch((e) => {
                return reject({
                  status: 503,
                  error: e,
                });
              });
          }
          else {
            return reject({
              status: 409,
              message: "This folder is already register",
            });
          }
        })
        .catch((e) => {
          console.log(e, "e");
        });
    });
  };
  NfcToFolder = (req) => {
    return new Promise((resolve, reject) => {
      FolderSchema.findOneAndUpdate({ Name: req.body.Name }, { "$push": { "Nfc": req.body.Nfc } }, { new: true })
        .then((res) => {
          nfcSchema.findByIdAndUpdate(req.body.Nfc, { Folder: true })
            .then((resp) => console.log(resp)).catch((e) => console.log(e))
          return resolve({
            status: 200,
            data: res,
          });

        })
        .catch((e) => {
          return reject({
            status: 503,
            error: e,
          });
        });

    })
  };
  GetFolder = (req) => {
    return new Promise((resolve, reject) => {
      FolderSchema.find({ User: req.query.userId }).populate('Nfc')
        .then((res) => {
          return resolve({
            status: 200,
            data: res,
          });
        })
        .catch((e) => {
          return reject({
            status: 503,
            error: e,
          });
        })
    })
  };
  NfcMoveOut = (req) => {
    return new Promise((resolve, reject) => {
      FolderSchema.findOneAndUpdate({ Name: req.body.Name }, { "$pull": { "Nfc": req.body.Nfc } }, { new: true })
        .then((res) => {
          nfcSchema.findByIdAndUpdate(req.body.Nfc, { Folder: false })
            .then((res) => console.log(res)).catch((e) => console.log(e))
          return resolve({
            status: 200,
            data: res,
          });

        })
        .catch((e) => {
          return reject({
            status: 503,
            error: e,
          });
        });
    })
  }
}

export default new FolderModel();
