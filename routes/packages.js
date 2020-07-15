const router = require('express').Router();
const packagesCtrl = require('../controllers/packages');

router.get('/', checkAuth, packagesCtrl.index);
router.post('/', checkAuth, packagesCtrl.create);
router.put('/:id', checkAuth, packagesCtrl.update);
router.delete('/:id', checkAuth, packagesCtrl.delete);

function checkAuth(req, res, next) {
    if(req.user) return next();
    return res.status(501).json({msg: 'Not Authorized'});
}

module.exports = router;