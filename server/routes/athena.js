const express = require('express');
var router = express.Router();

var calIndex = require('../api/arock.js');

router.post('/get_pool_overview', function(req, res, next) {
  calIndex.get_pool_overview(req.body, req).then(data => { res.send(data) });
});
router.post('/get_pool_miners', function(req, res, next) {
  calIndex.get_pool_miners(req.body, req).then(data => { res.send(data) });
});
router.post('/get_pool_trend', function(req, res, next) {
  calIndex.get_pool_trend(req.body, req).then(data => { res.send(data) });
});
router.post('/get_pool_mines', function(req, res, next) {
  calIndex.get_pool_mines(req.body, req).then(data => { res.send(data) });
});
router.post('/get_pool_last_block_info', function(req, res, next) {
  calIndex.get_pool_last_block_info(req.body, req).then(data => { res.send(data) });
});

module.exports = router;
