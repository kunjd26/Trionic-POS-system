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

            const user = new User({ name, email, role, phone, password: hashedPassword, createdBy: req.user.userId, updatedBy: req.user.userId });

            const user1 = await user.save();

            if (!user1) {
                return res.status(400).json({ status: 'fail', message: 'Failed to create user.' });
            }

            // Remove some private fields from the response.
            user1.password = undefined;
            user1.isDeleted = undefined;

            return res.status(201).json({ status: 'success', data: user1 });
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
                user = await User.findOne({ _id: objectId, isDeleted: false }, "_id userId name email phone role permissions updatedAt updatedBy");
            } else {
                user = await User.find({ isDeleted: false }, "_id userId name email phone role permissions updatedAt updatedBy");
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
            const { userId } = req.user;
            let { password } = req.body;

            if (password) {
                password = hashPassword(password);
            }

            await db.connect();
            const user = await User.findOneAndUpdate({ _id: objectId, isDeleted: false }, { name, email, role, permissions, phone, password, updatedBy: userId, updatedAt: new Date() }, { new: true, fields: "_id userId name email phone role permissions updatedAt updatedBy" });

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
