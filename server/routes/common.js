const express = require('express');
var router = express.Router();

var calIndex = require('../api/common.js');

router.post('/get_calculate_info', function(req, res, next) {
  calIndex.get_calculate_info(req.body, req).then(data => { res.send(data) });
});


module.exports = router;
