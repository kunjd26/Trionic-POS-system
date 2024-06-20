import mongoose from 'mongoose';

import env from './EnvironmentConfig.js';

// Database event listeners.
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on('open', () => console.log('open'));
mongoose.connection.on('disconnected', () => console.log('disconnected'));
mongoose.connection.on('reconnected', () => console.log('reconnected'));
mongoose.connection.on('disconnecting', () => console.log('disconnecting'));
mongoose.connection.on('close', () => console.log('close'));

class DatabaseConfig {
    async connect() {
        await mongoose.connect(env.DB_CONNECTION_STRING)
    }

    async disconnect() {
        await mongoose.disconnect();
    }
}

export default new DatabaseConfig();
