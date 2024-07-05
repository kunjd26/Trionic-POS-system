import express from 'express';

import invoice from '../controllers/Invoice.js';
import checkToken from '../middlewares/CheckToken.js';
import checkPermission from '../middlewares/CheckPermission.js';
import checkObjectId from '../middlewares/CheckObjectId.js';
import validateInvoiceCreateRequest from '../requests/InvoiceCreate.js'
import validateInvoiceUpdateRequest from '../requests/InvoiceUpdate.js';
import checkOrderId from '../middlewares/CheckOrderId.js';
import checkCustomerId from '../middlewares/CheckCustomerId.js';
import checkTaxAndDiscountAndCountTotal from '../middlewares/CheckTaxAndDiscountAndCountTotal.js';

const router = express.Router();

router.route('/')
    .post([validateInvoiceCreateRequest, checkToken, checkPermission('invoice:c'), checkOrderId, checkCustomerId, checkTaxAndDiscountAndCountTotal], invoice.store)
    .get([checkToken, checkPermission('invoice:r')], invoice.show)

router.route('/:objectId')
    .get([checkToken, checkPermission('invoice:r'), checkObjectId], invoice.show)
    .put([validateInvoiceUpdateRequest, checkToken, checkPermission('invoice:u'), checkObjectId, checkOrderId, checkCustomerId, checkTaxAndDiscountAndCountTotal], invoice.update)
    .delete([checkToken, checkPermission('invoice:d'), checkObjectId], invoice.destroy);

export default router;
