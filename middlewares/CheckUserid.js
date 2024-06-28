export default async function checkUserid(req, res, next) {
    try {
        const userid = req.params.userid ?? undefined;

        if (!userid) {
            return res.status(400).json({ status: 'fail', message: 'User id is required.' });
        }

        next();

    } catch (error) {
        next(error);
    }
}
