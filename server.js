import express from "express";
import Connectdb from './connection/connection';
import NfcRouter from './Routes/nfc';
import UsersRouter from './Routes/users';
import PaymentRouter from './Routes/payment';
import FolderRouter from './Routes/folder'
import cors from 'cors';
import dotenv from 'dotenv';
import pdf from "./utils/pdf";
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
//MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use(bodyParser.raw({type: 'application/json'}));
// app.use(express.urlencoded({ extended: false }))
app.use("/nfc", NfcRouter);
app.use("/users", UsersRouter);
app.use("/folder", FolderRouter);
app.use("/payment", PaymentRouter);
app.get('/pdf', pdf)
app.listen(port, () => {
    Connectdb()
    console.log(`server is running ${port}`)
})