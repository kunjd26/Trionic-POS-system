import db from '../config/DatabaseConfig.js';
import User from '../models/User.js';

export default function checkPermission(permission) {

    return async function (req, res, next) {
        try {
            const userId = req.user.userId;

            await db.connect();

            const user = await User.findById(userId, 'permissions');

            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'User not found.' });
            }

            const checkResource = permission.split(':')[0];
            const checkOperation = permission.split(':')[1];

            // Check if user has permission to access the resource.
            for (const permission of user.permissions) {
                if (permission.startsWith('all') || permission.startsWith(`${checkResource}:`)) {
                    const allowedOperations = permission.split(':')[1];
                    if (allowedOperations.includes('a') || allowedOperations.includes(checkOperation)) {
                        return next();
                    }
                }
            }

            return res.status(403).json({ status: 'fail', message: 'You hav not permission to perform this operation.' });

        } catch (error) {
            next(error);
        }
    }
}
