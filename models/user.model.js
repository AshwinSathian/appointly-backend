const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    slots: { type: [Number], default: [10, 11, 12, 13, 15, 16, 17, 18] }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
