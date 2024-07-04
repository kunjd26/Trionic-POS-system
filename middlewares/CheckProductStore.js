import db from '../config/DatabaseConfig.js';
import ProductStore from '../models/ProductStore.js';
import mongoose from 'mongoose';

export default async function checkProductStoreId(req, res, next) {
    try {
        const productStoreId = req.body.productStoreId ?? undefined;

        if (!productStoreId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(productStoreId)) {
            return res.status(400).json({ status: 'fail', message: 'productStoreId and must be a valid ObjectId.' });
        }

        await db.connect();

        const productStore = await ProductStore.findById(productStoreId, "_id");

        if (!productStore) {
            return res.status(400).json({ status: 'fail', message: 'productStoreId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
