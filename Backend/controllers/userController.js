const User = require('../models/User');

const searchUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (email, name) => {
    const user = new User({ email, name });
    await user.save();
    return user;
};

module.exports = { searchUserByEmail, createUser };