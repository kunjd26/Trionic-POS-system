import db from '../config/DatabaseConfig.js';
import Inventory from '../models/Inventory.js';

export default async function checkProviderId(req, res, next) {
    try {
        const availableQuantity = req.body.availableQuantity ?? undefined;
        const minimumQuantityLimit = req.body.minimumQuantityLimit ?? undefined;
        const maximumQuantityLimit = req.body.maximumQuantityLimit ?? undefined;

        if (!availableQuantity && !minimumQuantityLimit && !maximumQuantityLimit) {
            return next();
        } else {
            if (availableQuantity !== undefined && minimumQuantityLimit !== undefined && maximumQuantityLimit !== undefined) {
                if (minimumQuantityLimit <= availableQuantity && availableQuantity <= maximumQuantityLimit) {
                    return next();
                } else {
                    return res.status(400).json({ status: 'fail', message: 'availableQuantity must be between minimumQuantityLimit and maximumQuantityLimit.' });
                }
            } else if (availableQuantity !== undefined && minimumQuantityLimit !== undefined) {
                if (minimumQuantityLimit <= availableQuantity) {
                    return next();
                }
                return res.status(400).json({ status: 'fail', message: 'availableQuantity must be greater than or equal to minimumQuantityLimit.' });
            } else if (availableQuantity !== undefined && maximumQuantityLimit !== undefined) {
                if (availableQuantity <= maximumQuantityLimit) {
                    return next();
                }
                return res.status(400).json({ status: 'fail', message: 'availableQuantity must be less than or equal to maximumQuantityLimit.' });
            } else if (minimumQuantityLimit !== undefined && maximumQuantityLimit !== undefined) {
                if (minimumQuantityLimit <= maximumQuantityLimit) {
                    return next();
                }
                return res.status(400).json({ status: 'fail', message: 'minimumQuantityLimit must be less than or equal to maximumQuantityLimit.' });
            } else {
                const objectId = req.params.objectId;
                if (availableQuantity !== undefined) {
                    await db.connect();
                    const inventory = await Inventory.findOne({ _id: objectId, isDeleted: false });
                    if (!inventory) {
                        return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
                    }
                    if (inventory.minimumQuantityLimit <= availableQuantity && availableQuantity <= inventory.maximumQuantityLimit) {
                        return next();
                    } else {
                        return res.status(400).json({ status: 'fail', message: 'availableQuantity must be between minimumQuantityLimit and maximumQuantityLimit.' });
                    }
                } else if (minimumQuantityLimit !== undefined) {
                    await db.connect();
                    const inventory = await Inventory.findOne({ _id: objectId, isDeleted: false });
                    if (!inventory) {
                        return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
                    }
                    if (minimumQuantityLimit <= inventory.maximumQuantityLimit && minimumQuantityLimit <= inventory.availableQuantity) {
                        return next();
                    } else {
                        return res.status(400).json({ status: 'fail', message: 'minimumQuantityLimit must be less than or equal maximumQuantityLimit or availableQuantityLimit.' });
                    }
                } else if (maximumQuantityLimit !== undefined) {
                    await db.connect();
                    const inventory = await Inventory.findOne({ _id: objectId, isDeleted: false });
                    if (!inventory) {
                        return res.status(404).json({ status: 'fail', message: 'Inventory not found.' });
                    }
                    if (inventory.minimumQuantityLimit <= maximumQuantityLimit && inventory.availableQuantity <= maximumQuantityLimit) {
                        return next();
                    } else {
                        return res.status(400).json({ status: 'fail', message: 'maximumQuantityLimit must be greater or equal than minimumQuantityLimit or availableQuantityLimit.' });
                    }
                }
            }
        }
    } catch (error) {
        next(error);
    }
}
