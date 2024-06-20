import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minlength: [1, 'Name must be at least 1 character long.'],
        maxlength: [60, 'Name cannot exceed 60 characters.']
    },
    description: {
        type: String,
        required: false,
        maxlength: [300, 'Description cannot exceed 300 characters.']
    },
    barcode: {
        type: String,
        required: [true, 'Barcode is required.'],
        match: [/^\d{13}$/, 'Barcode must be 13 digits long.']
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required.'],
        min: [0, 'Weight must be greater than or equal to 0 gram.']
    },
    productCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductCategory',
        required: [true, 'ProductCategory is required.']
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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
