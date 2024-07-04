import db from '../config/DatabaseConfig.js';
import ProductCategory from '../models/ProductCategory.js';
import mongoose from 'mongoose';

export default async function checkProductCategoryId(req, res, next) {
    try {
        const productCategoryId = req.body.productCategoryId ?? undefined;

        if (!productCategoryId) {
            return next();
        }

        if (!mongoose.Types.ObjectId.isValid(productCategoryId)) {
            return res.status(400).json({ status: 'fail', message: 'ProductCategoryId must be a valid ObjectId.' });
        }

        await db.connect();

        const productCategory = await ProductCategory.findById(productCategoryId, "_id");

        if (!productCategory) {
            return res.status(400).json({ status: 'fail', message: 'ProductCategoryId is invalid.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
