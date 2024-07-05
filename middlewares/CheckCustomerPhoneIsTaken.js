import db from '../config/DatabaseConfig.js';
import Customer from '../models/Customer.js';

export default async function checkCustomerPhoneIsTaken(req, res, next) {
    try {
        const phone = req.body.phone ?? undefined;

        if (!phone) {
            return next();
        }

        await db.connect();

        const customer = await Customer.findOne({ phone }, "phone");

        if (customer) {
            return res.status(400).json({ status: 'fail', message: 'Phone no. is already taken.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
