const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // password:  {
    //     type: String,
    //     required: true
    // },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }

});

const User = mongoose.model("users", UserSchema);

console.log(mongoose.connection);
console.log(`In models/User connection is ${mongoose.connection}`);

module.exports = User;
