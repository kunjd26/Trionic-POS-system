import db from '../config/DatabaseConfig.js';
import Customer from '../models/Customer.js';
import mongoose from 'mongoose';

export default async function checkCustomerId(req, res, next) {
    try {
        const customerId = req.body.customerId ?? undefined;

        if (!customerId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ status: 'fail', message: 'customerId and must be a valid ObjectId.' });
        }

        await db.connect();

        const customer = await Customer.findById(customerId, "_id");

        if (!customer) {
            return res.status(400).json({ status: 'fail', message: 'customerId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
