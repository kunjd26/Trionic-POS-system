import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userid: {
        type: String,
        unique: true,
        immutable: true
    },
    role: {
        type: String,
        required: true,
        enum: { values: ['admin', 'manager', 'staff'] }
    },
    permissions: {
        type: [String],
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function (next) {
    if (!this.userid) {
        this.userid = crypto.randomBytes(3).toString('hex');
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
