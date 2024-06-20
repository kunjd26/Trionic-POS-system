import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [1, 'Name must be at least 1 character.'],
        maxlength: [60, 'Name must be at most 60 characters.']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required.'],
        enum: {
            values: ['male', female, 'not specified'],
            message: "Gender is invalid."
        }
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
    phone: {
        type: String,
        required: [true, 'Phone is required.']
    },
    address: {
        type: String,
        required: [true, 'Address is required.'],
        minlength: [1, 'Address must be at least 1 character long.'],
        maxlength: [300, 'Address cannot exceed 300 characters.']
    },
    postalCode: {
        type: String,
        required: [true, 'Postal code is required.'],
        match: [/^\d{6}$/, 'Postal code must be 6 digits long.']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'CreatedBy is required.'],
        immutable: true
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'UpdatedBy is required.']
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

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
