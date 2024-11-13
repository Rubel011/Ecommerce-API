const mongoose = require('mongoose');

// Define the user schema using Mongoose
const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatarUrl: { type: String,default: 'NA' },
    role: {
        type: String,
        enum: ['Customer', 'Seller', 'Admin'],
        default: 'Customer'
    },
}, {
    versionKey: false
});

// Create a User model using the defined schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = { User };
