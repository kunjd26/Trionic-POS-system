import Invoice from '../models/Invoice.js';
import db from '../config/DatabaseConfig.js';

class InvoiceController {

    async store(req, res, next) {
        try {
            const { orderId, customerId, tax, discount, total, paymentType, invoiceDate } = req.body;
            const invoice = new Invoice({
                orderId,
                customerId,
                tax,
                discount,
                total,
                paymentType,
                invoiceDate,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const invoice1 = await invoice.save();

            if (!invoice1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create invoice.' });
            }

            return res.status(201).json({ status: 'success', data: invoice1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let invoice;

            await db.connect();
            if (objectId) {
                invoice = await Invoice.findOne({ _id: objectId, isDeleted: false })
                    .populate('orderId', 'orderDate orderDetails itemCount subtotal')
                    .populate('customerId', 'name email phone address')
                    .select("tax discount total paymentType invoiceDate updatedBy updatedAt");
            } else {
                invoice = await Invoice.find({ isDeleted: false })
                    .populate('orderId', 'orderDate orderDetails itemCount subtotal')
                    .populate('customerId', 'name email phone address')
                    .select("tax discount total paymentType invoiceDate updatedBy updatedAt");
            }

            if (!invoice) {
                return res.status(404).json({ status: 'fail', message: 'Invoice not found.' });
            }

            return res.status(200).json({ status: 'success', data: invoice });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { orderId, customerId, tax, discount, total, paymentType, invoiceDate } = req.body;
            const { userId } = req.user;

            await db.connect();
            const invoice = await Invoice.findOneAndUpdate({ _id: objectId, isDeleted: false }, { orderId, customerId, tax, discount, invoiceDate, paymentType, total, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: "orderId customerId tax discount total paymentType invoiceDate updatedBy updatedAt" });

            if (!invoice) {
                return res.status(404).json({ status: 'fail', message: 'Invoice not found.' });
            }

            return res.status(200).json({ status: 'success', data: invoice });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const invoice = await Invoice.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!invoice) {
                return res.status(404).json({ status: 'fail', message: 'Invoice not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Invoice deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new InvoiceController();
