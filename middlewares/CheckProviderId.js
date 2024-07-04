import db from '../config/DatabaseConfig.js';
import Provider from '../models/Provider.js';
import mongoose from 'mongoose';

export default async function checkProviderId(req, res, next) {
    try {
        const providerId = req.body.providerId ?? undefined;

        if (!providerId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(providerId)) {
            return res.status(400).json({ status: 'fail', message: 'providerId and must be a valid ObjectId.' });
        }

        await db.connect();

        const provider = await Provider.findById(providerId, "_id");

        if (!provider) {
            return res.status(400).json({ status: 'fail', message: 'providerId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
