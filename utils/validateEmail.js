import users from "../schema/Users";

const validateEmail = async (email) => {
    return await users.findOne({ email }).lean();
}

export default validateEmail;