import mongoose from 'mongoose';

const productCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        minlength: [1, 'Title must be at least 1 character long.'],
        maxlength: [60, 'Title cannot exceed 60 characters.']
    },
    description: {
        type: String,
        required: false,
        maxlength: [300, 'Description cannot exceed 300 characters.']
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

const ProductCategory = mongoose.model('ProductCategory', productCategorySchema);

module.exports = ProductCategory;
