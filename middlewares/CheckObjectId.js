import mongoose from "mongoose";

export default function checkObjectId(req, res, next) {
    try {
        const objectId = req.params.objectId ?? undefined;

        if (!objectId) {
            return res.status(400).json({ status: 'fail', message: 'Object id is required.' });
        }

        if (!mongoose.Types.ObjectId.isValid(objectId)) {
            return res.status(400).json({ status: 'fail', message: 'Invalid object id.' });
        }

        return next();

    } catch (error) {
        next(error);
    }
}
