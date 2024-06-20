import env from './../config/EnvironmentConfig.js';

class GlobalErrorHandler {

    notFound(req, res, next) {
        res.status(404).send({ 'status': 'error', 'message': 'API endpoint not found.' });
    }

    internalServerError(err, req, res, next) {
        let statusCode = err.statusCode || 500;
        let errorMessage = env.APP_ENV == 'development' ? err.message : 'Something went wrong.';
        let errorStack = env.APP_ENV == 'development' ? err.stack : "none";

        res.status(statusCode).send({ 'status': 'error', 'message': errorMessage, 'stack': errorStack });
    }
}

export default new GlobalErrorHandler();
