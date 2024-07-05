import db from '../config/DatabaseConfig.js';
import Order from '../models/Order.js';
import mongoose from 'mongoose';

export default async function checkOrderId(req, res, next) {
    try {
        const orderId = req.body.orderId ?? undefined;

        if (!orderId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({ status: 'fail', message: 'orderId and must be a valid ObjectId.' });
        }

        await db.connect();

        const order = await Order.findById(orderId, "_id");

        if (!order) {
            return res.status(400).json({ status: 'fail', message: 'orderId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
