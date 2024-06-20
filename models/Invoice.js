import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: [true, 'Customer is required.']
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: [true, 'Order is required.']
    },
    invoiceDate: {
        type: Date,
        required: [true, 'Invoice date is required.']
    },
    tax: {
        type: Number,
        required: [true, 'Tax is required.'],
        min: [0, 'Tax must be greater than or equal to 0.']
    },
    discount: {
        type: Number,
        required: false,
        min: [0, 'Discount must be greater than or equal to 0.']
    },
    total: {
        type: Number,
        required: [true, 'Total is required.'],
        min: [0, 'Total must be greater than or equal to 0.']
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

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;
