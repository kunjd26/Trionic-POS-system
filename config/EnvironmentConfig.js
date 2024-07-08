import 'dotenv/config'

const environmentConfig = {
    APP_ENV: process.env.APP_ENV,
    APP_PORT: process.env.APP_PORT,
    APP_HOST: process.env.APP_HOST,
    APP_URL: `${process.env.APP_HOST}:${process.env.APP_PORT}`,

    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    TEST_DB_CONNECTION_STRING: process.env.TEST_DB_CONNECTION_STRING,

    PASSWORD_SALT: process.env.PASSWORD_SALT,
    PASSWORD_DIGEST: process.env.PASSWORD_DIGEST,
}

const env = Object.freeze(environmentConfig);

export default env;
