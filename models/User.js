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
    userId: {
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
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        immutable: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    if (!this.userId) {
        this.userId = crypto.randomBytes(3).toString('hex').toUpperCase();
    }
    if (this.role === 'admin') {
        this.permissions = ['all:a'];
    } else if (this.role === 'manager') {
        this.permissions = ['all:cru'];
    } else {
        this.permissions = ['customer:r', 'order:r', 'product:r'];
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
