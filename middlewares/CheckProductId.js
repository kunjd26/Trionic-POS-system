import db from '../config/DatabaseConfig.js';
import Product from '../models/Product.js';
import mongoose from 'mongoose';

export default async function checkProductId(req, res, next) {
    try {
        const productId = req.body.productId ?? undefined;

        if (!productId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ status: 'fail', message: 'productId and must be a valid ObjectId.' });
        }

        await db.connect();

        const product = await Product.findById(productId, "_id");

        if (!product) {
            return res.status(400).json({ status: 'fail', message: 'productId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
