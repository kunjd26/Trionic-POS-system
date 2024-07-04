import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productStoreId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductStore',
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityUnit: {
        type: String,
        required: true
    },
    availableQuantity: {
        type: Number,
        required: true
    },
    minimumQuantityLimit: {
        type: Number,
        required: true
    },
    maximumQuantityLimit: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
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

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
