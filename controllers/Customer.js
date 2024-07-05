import Customer from '../models/Customer.js';
import db from '../config/DatabaseConfig.js';

class CustomerController {

    async store(req, res, next) {
        try {
            const { name, gender, email, phone, address, postalCode } = req.body;
            const customer = new Customer({
                name,
                gender,
                email,
                phone,
                address,
                postalCode,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            });

            await db.connect();
            const customer1 = await customer.save();

            if (!customer1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create customer.' });
            }

            return res.status(201).json({ status: 'success', data: customer1 });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let customer;

            await db.connect();
            if (objectId) {
                customer = await Customer.findOne({ _id: objectId, isDeleted: false }, "name gender email phone addressed postalCode updatedBy updatedAt");
            } else {
                customer = await Customer.find({ _id: objectId, isDeleted: false })
                    .select("name gender email phone addressed postalCode updatedBy updatedAt");
                customer = await Customer.find({ isDeleted: false }, "name gender email phone addressed postalCode updatedBy updatedAt");
            }

            if (!customer) {
                return res.status(404).json({ status: 'fail', message: 'Customer not found.' });
            }

            return res.status(200).json({ status: 'success', data: customer });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { name, gender, email, phone, address, postalCode, } = req.body;
            const { userId } = req.user;

            await db.connect();
            const customer = await Customer.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, gender, email, phone, address, postalCode, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: "name gender email phone address postalCode updatedBy updatedAt" });

            if (!customer) {
                return res.status(404).json({ status: 'fail', message: 'Customer not found.' });
            }

            return res.status(200).json({ status: 'success', data: customer });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const customer = await Customer.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!customer) {
                return res.status(404).json({ status: 'fail', message: 'Customer not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'Customer deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new CustomerController();
