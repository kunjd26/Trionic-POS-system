import db from '../config/DatabaseConfig.js';
import Inventory from '../models/Inventory.js';

export default async function checkAvailableQuantity(req, res, next) {
    try {
        const { orderDetails } = req.body;

        if (!orderDetails) {
            return next();
        }

        let newAvailableQuantity = {};

        for (let details of orderDetails) {
            const { inventoryId, quantity } = details;

            await db.connect();

            const inventory = await Inventory.findOne({ _id: inventoryId })
                .populate('productId', 'name')
                .select("availableQuantity minimumQuantityLimit");

            if (!inventory) {
                return res.status(400).json({ status: 'fail', message: 'Inventory not found.', });
            }

            if (inventory.availableQuantity < quantity || inventory.availableQuantity - quantity < inventory.minimumQuantityLimit) {

                const productName = inventory.productId.name;
                return res.status(400).json({ status: 'fail', message: `Insufficient quantity for ${productName}.` });
            }

            // Map new available quantity to the inventory id.
            newAvailableQuantity[inventoryId] = inventory.availableQuantity - quantity;
        }

        for (let details of orderDetails) {
            const { inventoryId } = details;

            await Inventory.updateOne({ _id: inventoryId }, { availableQuantity: newAvailableQuantity[inventoryId] });
        }

        return next();

    } catch (error) {
        next(error);
    }
}
