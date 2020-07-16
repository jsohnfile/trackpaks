const router = require('express').Router();
const shippoCtrl = require('../controllers/shippos');

router.get('/', shippoCtrl.index)

module.exports = router;