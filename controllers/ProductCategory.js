import ProductCategory from '../models/ProductCategory.js';
import db from '../config/DatabaseConfig.js';

class ProductCategoryController {

    async store(req, res, next) {
        try {
            const { title, description } = req.body;
            const productCategory = new ProductCategory({
                title,
                description,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const productCategory1 = await productCategory.save();

            if (!productCategory1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create product category.' });
            }

            return res.status(201).json({ status: 'success', data: productCategory1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let productCategory;

            await db.connect();
            if (objectId) {
                productCategory = await ProductCategory.findOne({ _id: objectId, isDeleted: false }, "title description createdBy updatedBy createdAt updatedAt");
            } else {
                productCategory = await ProductCategory.find({ isDeleted: false }, "title description createdBy updatedBy createdAt updatedAt");
            }

            if (!productCategory) {
                return res.status(404).json({ status: 'fail', message: 'Product category not found.' });
            }

            return res.status(200).json({ status: 'success', data: productCategory });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { title, description } = req.body;
            const { userId } = req.user;

            await db.connect();
            const productCategory = await ProductCategory.findOneAndUpdate({ _id: objectId, isDeleted: false }, { title, description, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: 'title description updatedBy updatedAt' });

            if (!productCategory) {
                return res.status(404).json({ status: 'fail', message: 'Product category not found.' });
            }

            return res.status(200).json({ status: 'success', data: productCategory });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const productCategory = await ProductCategory.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!productCategory) {
                return res.status(404).json({ status: 'fail', message: 'Product category not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Product category deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductCategoryController();
