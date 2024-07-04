import Inventory from '../models/Inventory.js';
import db from '../config/DatabaseConfig.js';

class ProductController {

    async store(req, res, next) {
        try {
            const { productId, productStoreId, providerId, price, quantityUnit, availableQuantity, minimumQuantityLimit, maximumQuantityLimit } = req.body;
            const inventory = new Inventory({
                productId,
                productStoreId,
                providerId,
                price,
                quantityUnit,
                availableQuantity,
                minimumQuantityLimit,
                maximumQuantityLimit,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const inventory1 = await inventory.save();

            if (!inventory1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create product category.' });
            }

            return res.status(201).json({ status: 'success', data: inventory1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let inventory;

            await db.connect();
            if (objectId) {
                inventory = await Inventory.findOne({ _id: objectId, isDeleted: false })
                    .populate('productId', 'name description barcode')
                    .populate('productStoreId', 'name address')
                    .populate('providerId', 'name address phone')
                    .select("productId productStoreId providerId price quantityUnit availableQuantity minimumQuantityLimit maximumQuantityLimit updatedBy updatedAt");
            } else {
                inventory = await Inventory.find({ isDeleted: false })
                    .populate('productId', 'name description barcode')
                    .populate('productStoreId', 'name address')
                    .populate('providerId', 'name address phone')
                    .select("productId productStoreId providerId price quantityUnit availableQuantity minimumQuantityLimit maximumQuantityLimit updatedBy updatedAt");
            }

            if (!inventory) {
                return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
            }

            return res.status(200).json({ status: 'success', data: inventory });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { productStoreId, providerId, price, quantityUnit, availableQuantity, minimumQuantityLimit, maximumQuantityLimit } = req.body;
            const { userId } = req.user;

            await db.connect();
            const inventory = await Inventory.findOneAndUpdate({ _id: objectId, isDeleted: false }, { productStoreId, providerId, price, quantityUnit, availableQuantity, minimumQuantityLimit, maximumQuantityLimit, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: 'productId productStoreId providerId price quantityUnit availableQuantity minimumQuantityLimit maximumQuantityLimit updatedBy updatedAt' });

            if (!inventory) {
                return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
            }

            return res.status(200).json({ status: 'success', data: inventory });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const inventory = await Inventory.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!inventory) {
                return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Inventory deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();
