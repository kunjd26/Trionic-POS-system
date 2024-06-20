import mongoose from "mongoose";
import crypto from "crypto";

const validPermissions = ['read', 'write', 'delete'];

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [1, 'Name must be at least 1 character.'],
        maxlength: [60, 'Name must be at most 60 characters.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        validate: {
            validator: function (value) {
                // Regular expression to validate email format
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email format.'
        }
    },
    userid: {
        type: String,
        unique: true,
        immutable: true
    },
    role: {
        type: String,
        required: [true, 'Role is required.'],
        enum: {
            values: ['admin', 'manager', 'staff'],
            message: 'Role is invalid.'
        }
    },
    permissions: {
        type: [String],
        required: [true, 'Permissions are required.'],
        validate: {
            validator: function (v) {
                return v.every(permission => validPermissions.includes(permission));
            },
            message: props => `${props.value} is invalid.`
        }
    },
    phone: {
        type: String,
        required: [true, 'Phone is required.'],
        match: [/^\d{10}$/, 'Phone must be 10 digits long.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
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
