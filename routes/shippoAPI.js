const router = require('express').Router();
const shippoCtrl = require('../controllers/shippos');

router.get('/:carrier/:trackingNumber', checkAuth, shippoCtrl.index)

function checkAuth(req, res, next) {
    if(req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
}

module.exports = router;