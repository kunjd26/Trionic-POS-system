import db from '../config/DatabaseConfig.js';
import Order from '../models/Order.js';

export default async function checkTaxAndDiscountAndCountTotal(req, res, next) {
    try {
        const tax = req.body.tax ?? undefined;
        const discount = req.body.discount ?? undefined;
        const orderId = req.body.orderId ?? undefined;

        if (!tax && !discount) {
            return next();
        }

        if (orderId) {
            await db.connect();

            const order = await Order.findById(orderId, "subtotal");

            if (!order) {
                return res.status(400).json({ status: 'fail', message: 'orderId is invalid.' });
            }

            let subtotal = order.subtotal;
            let total = 0;
            if (discount) {
                total += subtotal - (subtotal * discount / 100);
                subtotal = total;
            }

            if (tax && subtotal == total) {
                total += (subtotal * tax / 100);
            } else if (tax) {
                total += subtotal + (subtotal * tax / 100);
            }

            req.body.total = total;
        }

        return next();
    } catch (error) {
        next(error);
    }
}
