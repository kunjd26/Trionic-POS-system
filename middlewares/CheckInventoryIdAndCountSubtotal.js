import db from '../config/DatabaseConfig.js';
import Inventory from '../models/Inventory.js';
import mongoose from 'mongoose';

export default async function checkInventoryIdAndCountSubtotal(req, res, next) {
    try {
        const orderDetails = req.body.orderDetails ?? undefined;

        if (!orderDetails) {
            return next();
        }


        // orderDetails is a array contain objects and object contain two field first inventoryId and quantity now check all inventory id are valid and is present in database and count subtotal.
        let subtotal = 0;
        let itemCount = 0;

        for (let detail of orderDetails) {
            const inventoryId = detail.inventoryId; // Assuming this is how you access inventoryId

            if (!mongoose.Types.ObjectId.isValid(inventoryId)) {
                return res.status(400).json({ status: 'fail', message: 'inventoryId must be a valid ObjectId.' });
            }

            await db.connect();

            const inventory = await Inventory.findById(inventoryId, "_id price");

            if (!inventory) {
                return res.status(400).json({ status: 'fail', message: 'inventoryId is invalid.' });
            }

            subtotal += (inventory.price * detail.quantity);
            itemCount++;
        }

        req.body.subtotal = subtotal;
        req.body.itemCount = itemCount;

        return next();
    } catch (error) {
        next(error);
    }
}
