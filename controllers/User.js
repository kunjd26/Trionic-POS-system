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
                userid: user.userid,
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
            const userid = req.params.userid ?? undefined;
            let user;

            await db.connect();
            if (userid) {
                user = await User.findOne({ userid }, "userid name email phone role permissions");
            } else {
                user = await User.find({}, "userid name email phone role permissions");
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
            const userid = req.params.userid;
            const { name, email, role, phone, permissions } = req.body;
            let { password } = req.body;

            if (password) {
                password = hashPassword(password);
            }

            await db.connect();
            const user = await User.findOneAndUpdate({ userid }, { name, email, role, permissions, phone, password }, { new: true, fields: 'userid name email phone role permissions' });

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
            const userid = req.params.userid;

            await db.connect();

            const user = await User.findOneAndDelete({ userid });

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
            const { userid, password } = req.body;
            const hashedPassword = hashPassword(password);
            let queryObject;

            // 
            if (emailIsValid(userid)) {
                queryObject = {
                    email: userid,
                    password: hashedPassword
                }
            } else {
                queryObject = {
                    userid: userid,
                    password: hashedPassword
                }
            }

            await db.connect();

            const user = await User.findOne(queryObject);

            if (!user) {
                return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
            }

            const token = generateToken();
            const userToken = new UserToken({ token: token, userid: user._id });
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
            const userToken = await UserToken.findOneAndUpdate({ token: token, isSignout: false }, { isSignout: true });

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
