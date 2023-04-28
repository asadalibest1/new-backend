import { Payment, Paymentsuccess, subscription_Active } from "../Model/payment";

export const PaymentController = (req, res) => {
  const result = Payment(req);
  result
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((e) => {
      res.status(400).json(e);
    })
}
export const PaymentsuccessController = (req, res) => {
  const result = Paymentsuccess(req);
  result
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((e) => {
      res.status(400).json(e);
    })
}
export const subscription_ActiveController = (req, res) => {
  const result = subscription_Active(req);
  result
    .then((resp) => {
      res.status(200).json(resp);
    })
    .catch((e) => {
      res.status(400).json(e);
    })
}