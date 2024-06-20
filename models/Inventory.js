import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required.']
    },
    productStoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductStore',
        required: [true, 'ProductStore is required.']
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, 'Provider is required.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be greater than or equal to 0.']
    },
    quantityUnit: {
        type: String,
        required: [true, 'Quantity unit is required.'],
        enum: {
            values: ['gram', 'milliliter', 'piece'],
            message: 'Quantity unit is invalid.'
        }
    },
    availableQuantity: {
        type: Number,
        required: [true, 'Available quantity is required.'],
        min: [0, 'Available quantity must be greater than or equal to 0.']
    },
    minimumQuantityLimit: {
        type: Number,
        required: [true, 'Minimum quantity limit is required.'],
        min: [0, 'Minimum quantity limit must be greater than or equal to 0.']
    },
    maximumQuantityLimit: {
        type: Number,
        required: [true, 'Maximum quantity limit is required.'],
        min: [0, 'Maximum quantity limit must be greater than or equal to 0.']
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

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
