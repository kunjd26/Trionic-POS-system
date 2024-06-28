import { pbkdf2Sync } from 'crypto';
import env from './../config/EnvironmentConfig.js';

export default function hashPassword(password) {
    const key = pbkdf2Sync(password, env.PASSWORD_SALT, 100000, 64, env.PASSWORD_DIGEST);
    return key.toString('hex');
}
