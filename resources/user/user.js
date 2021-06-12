const mongoose = require("mongoose");
const {
    bcryptHash,
    bcryptVerifyHash,
} = require("../../utils/cryptography/hashing.js");

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

// Execute this function before doc saved to db
userSchema.pre("save", async function (next) {
    this.password = await bcryptHash(this.password);
    next();
});

userSchema.methods.verifyPassword = function (password) {
    const passwordHash = this.password;
    return bcryptVerifyHash(password, passwordHash);
};

module.exports = mongoose.model("user", userSchema);
