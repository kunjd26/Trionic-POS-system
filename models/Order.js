import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        required: [true, 'Order date is required.']
    },
    itemCount: {
        type: Number,
        required: [true, 'Item count is required.'],
        min: [0, 'Item count must be greater than or equal to 0.']
    },
    subtotal: {
        type: Number,
        required: [true, 'Subtotal is required.'],
        min: [0, 'Subtotal must be greater than or equal to 0.']
    },
    orderType: {
        type: String,
        required: [true, 'Order type is required.'],
        enum: {
            values: ['online', 'offline'],
            message: 'Order type is invalid.'
        }
    },
    status: {
        type: String,
        required: [true, 'Status is required.'],
        enum: {
            values: ['pending', 'processing', 'completed', 'cancelled'],
            message: 'Status is invalid.'
        }
    },
    orderDetails: [{
        inventoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
            required: [true, 'InventoryId is required.']
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required.'],
            min: [0, 'Quantity must be greater than or equal to 0.']
        }
    }],
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

const Order = mongoose.model('Order', orderSchema);

export default Order;
