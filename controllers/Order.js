import Order from '../models/Order.js';
import db from '../config/DatabaseConfig.js';

class OrderController {

    async store(req, res, next) {
        try {
            const { orderDate, itemCount, subtotal, orderType, status, orderDetails } = req.body;
            const order = new Order({
                orderDate,
                itemCount,
                subtotal,
                orderType,
                status,
                orderDetails,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const order1 = await order.save();

            if (!order1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create order.' });
            }

            return res.status(201).json({ status: 'success', data: order1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let order;

            await db.connect();
            if (objectId) {
                order = await Order.findOne({ _id: objectId, isDeleted: false }, "orderDate itemCount subtotal orderType status orderDetails updatedBy updatedAt");
            } else {
                order = await Order.find({ isDeleted: false }, "orderDate itemCount subtotal orderType status orderDetails updatedBy updatedAt");
            }

            if (!order) {
                return res.status(404).json({ status: 'fail', message: 'Order not found.' });
            }

            return res.status(200).json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { orderDate, itemCount, subtotal, orderType, status, orderDetails } = req.body;
            const { userId } = req.user;

            await db.connect();
            const order = await Order.findOneAndUpdate({ _id: objectId, isDeleted: false }, { orderDate, itemCount, subtotal, orderType, status, orderDetails, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: "orderDate itemCount subtotal orderType status orderDetails updatedBy updatedAt" });

            if (!order) {
                return res.status(404).json({ status: 'fail', message: 'Order not found.' });
            }

            return res.status(200).json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const order = await Order.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!order) {
                return res.status(404).json({ status: 'fail', message: 'Order not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Order deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new OrderController();
