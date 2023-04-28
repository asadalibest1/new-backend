
import jwt from 'jsonwebtoken';

const matchPassword = (id, password) => jwt.verify(id, process.env.HASH_PASSWORD, (err, decoded) => {
    if (decoded === password)
        return true;
    else
        return err;
});

export default matchPassword;

export const generateToken = (value) => jwt.sign(value, process.env.JWT_SECRET);
export const HashingPassword = (value) => jwt.sign(value, process.env.HASH_PASSWORD);

