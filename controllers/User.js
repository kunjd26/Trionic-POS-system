import emailIsValid from './../services/EmailIsValid.js';
import hashPassword from '../services/HashPassword.js';
import generateToken from '../services/GenerateToken.js';
import db from '../config/DatabaseConfig.js';
import User from '../models/User.js';
import UserToken from '../models/UserToken.js';
class UserController {

    async store(req, res, next) {
        try {
            const { name, email, role, phone, password } = req.body;
            const hashedPassword = hashPassword(password);

            await db.connect();

            const user = new User({ name, email, role, phone, password: hashedPassword });

            await user.save();

            const response = {
                userId: user.userId,
                name: user.name,
                email: user.email,
                role: user.role,
            }

            return res.status(201).json({ status: 'success', data: response });
        } catch (error) {
            next(error);
        }
    }

    async show(req, res, next) {
        try {
            const objectId = req.params.objectId ?? undefined;
            let user;

            await db.connect();
            if (objectId) {
                user = await User.findOne({ _id: objectId, isDeleted: false }, "_id, userId name email phone role permissions");
            } else {
                user = await User.find({ isDeleted: false }, "_id, userId name email phone role permissions");
            }

            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'User not found.' });
            }

            return res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const objectId = req.params.objectId;
            const { name, email, role, phone, permissions } = req.body;
            let { password } = req.body;

            if (password) {
                password = hashPassword(password);
            }

            await db.connect();
            const user = await User.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, email, role, permissions, phone, password, updatedAt: new Date() }, { new: true, fields: 'userid name email phone role permissions' });

            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'User not found.' });
            }

            return res.status(200).json({ status: 'success', data: user });
        } catch (error) {
            next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const objectId = req.params.objectId;

            await db.connect();

            const user = await User.findOneAndUpdate({ _id: objectId, isDeleted: false }, { isDeleted: true });

            if (!user) {
                return res.status(404).json({ status: 'fail', message: 'User not found.' });
            }

            return res.status(200).json({ status: 'success', message: 'User deleted successfully.' });
        } catch (error) {
            next(error);
        }
    }

    async signin(req, res, next) {
        try {
            const { userId, password } = req.body;
            const hashedPassword = hashPassword(password);
            let queryObject;

            // 
            if (emailIsValid(userId)) {
                queryObject = {
                    email: userId,
                    password: hashedPassword,
                    isDeleted: false
                }
            } else {
                queryObject = {
                    userId: userId,
                    password: hashedPassword,
                    isDeleted: false
                }
            }

            await db.connect();

            const user = await User.findOne(queryObject);

            if (!user) {
                return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
            }

            const token = generateToken();
            const userToken = new UserToken({ token: token, userId: user._id });
            await userToken.save();

            return res.status(200).json({ status: 'success', data: { token: token } });
        } catch (error) {
            next(error);
        }
    }

    async signout(req, res, next) {
        try {
            const token = req.user.token;

            await db.connect();

            // Update the token to expired.
            const userToken = await UserToken.findOneAndUpdate({ token: token, isSignout: false, isDeleted: false }, { isSignout: true, updatedAt: new Date() });

            if (!userToken) {
                return res.status(401).json({ status: 'fail', message: 'Token is invalid or expired.' });
            }

            return res.status(200).json({ status: 'success', message: 'Signout successfully.' });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
