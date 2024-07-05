import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        required: true
    },
    itemCount: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    orderType: {
        type: String,
        required: true,
        // values: ['online', 'offline']
    },
    status: {
        type: String,
        required: true
        // values: ['pending', 'processing', 'completed', 'cancelled']
    },
    orderDetails: [{
        inventoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Inventory',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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

const Order = mongoose.model('Order', orderSchema);

export default Order;
