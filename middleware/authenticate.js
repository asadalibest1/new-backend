import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';

var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const authenticateMetamask = async (req, res, next) => {

    if (req.body.type === "metamask") {
        await verifyMetamask(req, res, next);
    } else {
        res.status(401).send({ code: 401, error: 'Type not found!' });

    }

}

const verifyMetamask = async (req, res, next) => {

    const { signature, nonce, address } = req.body;

    if (!signature || !nonce || !address) {
        return res.status(401).send({ code: 401, success: false, error: 'Invalid credentials' });

    }
    try {

        const verify = ethers.verifyMessage(
            nonce,
            signature
        );

        if (address.toUpperCase() === verify.toUpperCase()) {
            next()
        } else {
            return res.status(401).send({ code: 401, success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(401).send({ error: "unauthorized" })
    }
};


export const walletVerify = async (req, res, next) => {

    const { type } = req.body;
    if (!type || type !== "metamask") return res.status(401).send({ code: 401, success: false, error: "error accured in type!" })
    try {
        await verifyMetamask(req, res, next);
    } catch (error) {
        return res.status(401).send({ error: "unauthorized" })
    }

};

export const authenticateEmailPassword = async (req, res, next) => {

    const { type, email, password } = req.body;

    if (!type || type !== "emailPassword") return res.status(401).send({ code: 401, success: false, error: "error accured in type!" })
    if (!validRegex.test(email)) return res.status(401).send({ code: 401, success: false, error: "error accured in email!" })
    if (!password) return res.status(401).send({ code: 401, success: false, error: "error accured in password!" })
    next();
};

export const authenticateUser = async (req, res, next) => {

    try {
        console.log('req.headers', req.headers.authorization.split(' ')[1])
        let headerToken = req.headers.authorization?.split(' ')[1];

        try {
            const verify = jwt.verify(headerToken, process.env.JWT_SECRET);

            if (verify === req.query.userId) {
                next()
            } else {
                res.status(403).send({ error: { status: 403, msg: "invalid id or tokken!" } })
            }
        }
        catch (e) {
            res.status(403).send({ error: { status: 403, msg: "invalid id or tokken!" } })

        }

    } catch (error) {
        console.error('err', error);
        res.status(401).send({ Error: "unauthorized" })
    }


};


// export const authenticateEmailPasswordLogin = async (req, res, next) => {

//     const { type, email, password } = req.body;

//     if (!type || type !== "emailPassword") return res.status(401).send({ code: 401, error: "error accured in type!" })
//     if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
//     if (!password) return res.status(401).send({ code: 401, error: "error accured in password!" })
//     next();
// };

export const authenticateEmail = async (req, res, next) => {

    const { email } = req.body;

    if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
    next();
};

export const authenticateOtp = async (req, res, next) => {

    const { otp, email } = req.query;

    if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
    if (!otp) return res.status(401).send({ code: 401, error: "error accured in otp!" })

    next();
};


export const authenticatePassword = async (req, res, next) => {

    const { otp, email } = req.query;
    const { password } = req.body;

    if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
    if (!otp) return res.status(401).send({ code: 401, error: "error accured in otp!" })
    if (!password || password?.toString()?.split('')?.length < 6) return res.status(401).send({ code: 401, error: "error accured in password!", msg: "password must be equal or greater then 6" })

    next();
};


export const authenticateGmail = async (req, res, next) => {

    const { type, email, gmail_id } = req.body;

    if (!type || type !== "gmail") return res.status(401).send({ code: 401, error: "error accured in type!" })
    if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
    if (!gmail_id) return res.status(401).send({ code: 401, error: "error accured in gmail id!" })
    next();
};



export const authenticateMetaMaskEmailPassword = async (req, res, next) => {

    const { type } = req.body;

    if (!type || type !== "metamask") return res.status(401).send({ code: 401, error: "error accured in type!" })
    await verifyMetamask(req, res, next);

};

export const authenticateMetaMaskEmailPasswordSignup = async (req, res, next) => {

    const { email, password, type } = req.body;

    if (!type || type !== "metamask") return res.status(401).send({ code: 401, error: "error accured in type!" })
    if (!validRegex.test(email)) return res.status(401).send({ code: 401, error: "error accured in email!" })
    // if (!password || password?.toString()?.split('')?.length < 6) return res.status(401).send({ code: 401, error: "error accured in password!", msg: "password must be equal or greater then 6" })
    await verifyMetamask(req, res, next);

};