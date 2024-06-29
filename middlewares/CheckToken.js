import db from '../config/DatabaseConfig.js';
import UserToken from '../models/UserToken.js';

export default async function checkToken(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1] ?? undefined;

        if (!token) {
            return res.status(401).json({ status: 'fail', message: 'Token is required in request header.' });
        }

        await db.connect();

        const userToken = await UserToken.findOne({ token: token, isSignout: false }, 'userId');

        if (!userToken) {
            return res.status(401).json({ status: 'fail', message: 'Token is invalid or expired.' });
        }

        // Add userid in req.user object.
        req.user = { userId: userToken.userId, token: token };
        return next();

    } catch (error) {
        next(error);
    }
}
