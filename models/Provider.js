import mongoose from 'mongoose';

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [1, 'Name must be at least 1 character long.'],
        maxlength: [60, 'Name cannot exceed 60 characters.']
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
    phone: {
        type: String,
        required: [true, 'Phone is required.'],
        match: [/^\d{10}$/, 'Phone must be 10 digits long.']
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

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;
