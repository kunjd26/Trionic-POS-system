import Provider from '../models/Provider.js';
import db from '../config/DatabaseConfig.js';

class ProviderController {

    async store(req, res, next) {
        try {
            const { name, address, postalCode, phone } = req.body;
            const provider = new Provider({
                name,
                address,
                postalCode,
                phone,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const provider1 = await provider.save();

            if (!provider1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create provider.' });
            }

            return res.status(201).json({ status: 'success', data: provider1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let provider;

            await db.connect();
            if (objectId) {
                provider = await Provider.findOne({ _id: objectId, isDeleted: false }, "name address postalCode phone updatedBy updatedAt");
            } else {
                provider = await Provider.find({ isDeleted: false }, "name address postalCode phone updatedBy updatedAt");
            }

            if (!provider) {
                return res.status(404).json({ status: 'fail', message: 'Provider not found.' });
            }

            return res.status(200).json({ status: 'success', data: provider });
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
            const provider = await Provider.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, address, postalCode, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: 'name address postalCode updatedBy updatedAt' });

            if (!provider) {
                return res.status(404).json({ status: 'fail', message: 'Provider not found.' });
            }

            return res.status(200).json({ status: 'success', data: provider });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const provider = await Provider.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!provider) {
                return res.status(404).json({ status: 'fail', message: 'Provider not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Provider deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new ProviderController();
