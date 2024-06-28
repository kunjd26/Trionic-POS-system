import db from '../config/DatabaseConfig.js';
import User from '../models/User.js';

export default async function checkEmailIsTaken(req, res, next) {
    try {
        const email = req.body.email ?? undefined;

        if (!email) {
            return next();
        }

        await db.connect();

        const user = await User.findOne({ email }, "email");

        if (user) {
            return res.status(400).json({ status: 'fail', message: 'Email is already taken.' });
        }

        return next();
    } catch (error) {
        next(error);
    }
}
