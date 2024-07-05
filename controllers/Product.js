import Product from '../models/Product.js';
import db from '../config/DatabaseConfig.js';

class ProductController {

    async store(req, res, next) {
        try {
            const { name, description, weight, barcode, productCategoryId } = req.body;
            const product = new Product({
                name,
                description,
                weight,
                barcode,
                productCategoryId,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const product1 = await product.save();

            if (!product1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create product category.' });
            }

            return res.status(201).json({ status: 'success', data: product1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let product;

            await db.connect();
            if (objectId) {
                product = await Product.findOne({ _id: objectId, isDeleted: false })
                    .populate('ProductCategoryId', 'title description')
                    .select("name description weight barcode updatedBy updatedAt");
            } else {
                product = await Product.find({ isDeleted: false })
                    .populate('ProductCategoryId', 'title description')
                    .select("name description weight barcode updatedBy updatedAt");
            }

            if (!product) {
                return res.status(404).json({ status: 'fail', message: 'Product not found.' });
            }

            return res.status(200).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { name, description, weight, barcode, productCategoryId } = req.body;
            const { userId } = req.user;

            await db.connect();
            const product = await Product.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, description, weight, barcode, productCategoryId, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: 'name description weight barcode productCategoryId updatedBy updatedAt' });

            if (!product) {
                return res.status(404).json({ status: 'fail', message: 'Product not found.' });
            }

            return res.status(200).json({ status: 'success', data: product });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const product = await Product.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!product) {
                return res.status(404).json({ status: 'fail', message: 'Product not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Product deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
