import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false
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
