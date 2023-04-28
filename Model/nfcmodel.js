import AuthorSchema from "../schema/AuthorSchema";
import NfcSchema from "../schema/nfcSchema";
import OwnerSchema from "../schema/OwnerSchema";
import KycSchema from "../schema/kycschema.js";
import KybSchema from "../schema/kybSchema.js";
import users from "../schema/Users";
class NfcModel {
  PostNfc = (req) => {
    return new Promise((resolve, reject) => {
      NfcSchema.find({ Title: req.body.Title }).then((res) => {
        if (res.length == 0) {
          KycSchema.find({ User: req.query.userId })
            .then((res) => {
              if (res[0].Verified == true) {
                let body = {
                  ...req.body,
                  User: req.query.userId,
                };
                const data = new NfcSchema(body);
                data
                  .save()
                  .then(async (res) => {
                    const updatedUser = await users.findById(req.query.userId);
                    let data = Number(updatedUser.NFC_Count);
                    data -= 1;
                    updatedUser.NFC_Count = data;
                    await updatedUser.save()
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
              } else {
                return reject({
                  status: 503,
                  message: "KYC form is not verified",
                });
              }
            })
            .catch((e) => {
              return reject({
                status: 503,
                message: "KYC form is not verified",
              });
            });
        } else {
          return reject({
            status: 409,
            message: "This NFC is already register",
          });
        }
      });
    });
  };
  GetsingleNfc = (req) => {
    return new Promise((resolve, reject) => {
      return NfcSchema.findOne({ _id: req.query.id })
        .populate("User")
        .populate("Author")
        .populate("Owner")
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
    });
  };
  GetNfc = (req) => {
    return new Promise((resolve, reject) => {
      return NfcSchema.find({ User: req.query.userId, Folder: false })
        .populate("Author")
        .populate("Owner")
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
    });
  };
  CreateAuthor = (req) => {
    return new Promise((resolve, reject) => {
      const data = new AuthorSchema(req.body);
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
    });
  };
  CreateOwner = (req) => {
    return new Promise((resolve, reject) => {
      const data = new OwnerSchema(req.body);
      console.log("data", data);
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
    });
  };
  // CreateCreator = (req) => {
  //     return new Promise((resolve, reject) => {
  //         const data = new CreatorSchema(req.body)
  //         data.save()
  //             .then((res) => {
  //                 return resolve({
  //                     status: 200,
  //                     message: res,
  //                 });
  //             })
  //             .catch((e) => {
  //                 return reject({
  //                     status: 503,
  //                     message: e,
  //                 });
  //             })
  //     })
  // }
  PostKyc = (req) => {
    return new Promise((resolve, reject) => {
      users.find({ _id: req.query.userId }).then(async (res) => {
        console.log(res)
        if (res[0].kyc == false) {
          const data = new KycSchema(req.body);
          data
            .save()
            .then((res) => {
              if (res) {
                users.findOneAndUpdate(
                  { _id: req.body.User },
                  { kyc: true },
                  function (err, success) {
                    if (err) {
                      console.log(err);
                    } else if (success) {
                      console.log(success);
                    }
                  }
                );
              }
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
        } else {

          // res.NFC_Count = res.NFC_Count--;
          // console.log(updatedUser);
          // await updatedUser.save()
          return resolve({
            status: 200,
            message: "Kyc and Kyb form is fill only one time",
          });
        }
      });
    });
  };
  PostKyb = (req) => {
    return new Promise((resolve, reject) => {
      users.find({ _id: req.query.userId }).then((res) => {
        if (res[0].kyc == false) {
          const data = new KybSchema(req.body);
          data
            .save()
            .then((res) => {
              if (res) {
                users.findOneAndUpdate(
                  { _id: req.body.User },
                  { kyc: true },
                  function (err, success) {
                    if (err) {
                      console.log(err);
                    } else if (success) {
                      console.log(success);
                    }
                  }
                );
              }
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
        } else {
          return resolve({
            status: 200,
            message: "Kyc and Kyb form is fill only one time",
          });
        }
      });
    });
  };
  Verifyform = (req) => {
    return new Promise((resolve, reject) => {
      users.findById({ _id: req.query.UserId })
        .then((res) => {
          console.log(res);
          if (res.UserVerified) {
            return resolve({
              status: 200,
              Message: "User is Already Verified",
            })
          }
          else {
            KycSchema.findOneAndUpdate({ User: req.query.UserId }, { Verified: true, })
              .then((res) => {
                if (res == null) {
                  KybSchema.findOneAndUpdate({ User: req.query.UserId }, { Verified: true, })
                    .then((res) => {
                      if (res == null) {
                        return reject({
                          status: 503,
                          error: "User is not filled KYC and KYB form",
                        })
                      }
                      else {
                        users.findByIdAndUpdate({ _id: req.query.UserId }, { UserVerified: true })
                          .then((resp) => {
                            return resolve({
                              status: 200,
                              message: "User is Verified",
                              data: resp
                            })

                          })
                          .catch((e) => {
                            return reject({
                              status: 503,
                              error: e,
                            })
                          })
                      }
                    })
                }
                else {
                  users.findByIdAndUpdate({ _id: req.query.UserId }, { UserVerified: true })
                    .then((resp) => {
                      return resolve({
                        status: 200,
                        message: "User is Verified",
                        data: resp
                      })

                    })
                    .catch((e) => {
                      return reject({
                        status: 503,
                        error: e,
                      })
                    })
                }
              })
              .catch((e) => {
                return reject({
                  status: 503,
                  error: "User is not filled KYC and KYB form",
                })
              })
          }
        })
        .catch((e) => {
          return reject({
            status: 503,
            error: e,
          })
        })

    })
  }
  MintNfc = (req) => {
    return new Promise((resolve, reject) => {
      NfcSchema.findByIdAndUpdate(req.query.id, { NfcType: "Mint", Nfc_Verified: true })
        .then((res) => {
          return resolve({
            status: 200,
            Msg: "NFC is minted Successfully",
          })
        })
        .catch((e) => {
          return reject({
            status: 403,
            Error: e,
          })
        })
    })
  }
  Dashboard = async(req) => {
try {
  let mintcount = await NfcSchema.countDocuments({User: req.query.userId,Nfc_Verified:true})
  let DraftCount = await NfcSchema.countDocuments({User: req.query.userId,NfcType:"Draft"})
  return ({
    status: 200,
    data:{
    MintNfc: mintcount,
    DraftNfc:DraftCount
    }
  })
} catch (error) {
  return ({
    status: 503,
    error: e,
  })
}

  }
}
export default new NfcModel();
