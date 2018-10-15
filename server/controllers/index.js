var path = require('path');
var express = require('express');
var router = express.Router();

router.get('/api', function(req, res) {
    res.json({"message": "Welcome to Goodreader library!"});
});

// Insert routes below
router.use('/api/camels', require('./camels'));
router.use('/api/user', require('./books'));
router.use('/api/admin', require('./books'));
router.use('/api/user', require('./users'));
router.use('/api/admin', require('./users'));
router.use('/api/user', require('./reviews'));
router.use('/api/admin', require('./reviews'));
router.use('/api', require('./books'));
router.use('/api', require('./users'));
router.use('/api', require('./reviews'));
router.use('/api', require('./admins'));

// All other routes redirect to the index.html
router.route('/*').get(function (req, res) {
    var relativeAppPath = req.app.get('appPath');
    var absoluteAppPath = path.resolve(relativeAppPath);
    res.sendFile(absoluteAppPath + '/index.html');
});

module.exports = router
