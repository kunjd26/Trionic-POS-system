import ProductStore from '../models/ProductStore.js';
import db from '../config/DatabaseConfig.js';

class ProductStoreController {

    async store(req, res, next) {
        try {
            const { name, address, postalCode } = req.body;
            const productStore = new ProductStore({
                name,
                address,
                postalCode,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const productStore1 = await productStore.save();

            if (!productStore1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create product store.' });
            }

            return res.status(201).json({ status: 'success', data: productStore1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let productStore;

            await db.connect();
            if (objectId) {
                productStore = await ProductStore.findOne({ _id: objectId, isDeleted: false }, "name address postalCode updatedBy updatedAt");
            } else {
                productStore = await ProductStore.find({ isDeleted: false }, "name address postalCode updatedBy updatedAt");
            }

            if (!productStore) {
                return res.status(404).json({ status: 'fail', message: 'Product store not found.' });
            }

            return res.status(200).json({ status: 'success', data: productStore });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { name, address, postalCode } = req.body;
            const { userId } = req.user;

            await db.connect();
            const productStore = await ProductStore.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, address, postalCode, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: 'name address postalCode updatedBy updatedAt' });

            if (!productStore) {
                return res.status(404).json({ status: 'fail', message: 'Product store not found.' });
            }

            return res.status(200).json({ status: 'success', data: productStore });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const productStore = await ProductStore.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!productStore) {
                return res.status(404).json({ status: 'fail', message: 'Product store not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Product store deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductStoreController();
