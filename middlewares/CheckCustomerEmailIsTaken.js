import db from '../config/DatabaseConfig.js';
import Customer from '../models/Customer.js';

export default async function checkCustomerEmailIsTaken(req, res, next) {
    try {
        const email = req.body.email ?? undefined;

        if (!email) {
            return next();
        }

        await db.connect();

        const customer = await Customer.findOne({ email }, "email");

        if (customer) {
            return res.status(400).json({ status: 'fail', message: 'Email is already taken.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
