const express = require('express');
var router = express.Router();

var calIndex = require('../api/index.js');

router.post('/get_overview', function(req, res, next) {
  calIndex.get_overview(req.body, req).then(data => { res.send(data) });
});
router.post('/get_power_trend', function(req, res, next) {
  calIndex.get_power_trend(req.body, req).then(data => { res.send(data) });
});
router.post('/get_miner_ranking', function(req, res, next) {
  calIndex.get_miner_ranking(req.body, req).then(data => { res.send(data) });
});
router.post('/get_block_list', function(req, res, next) {
  calIndex.get_block_list(req.body, req).then(data => { res.send(data) });
});
router.post('/get_power_distribution', function(req, res, next) {
  calIndex.get_power_distribution(req.body, req).then(data => { res.send(data) });
});
router.post('/get_notice_list', function(req, res, next) {
  calIndex.get_notice_list(req.body, req).then(data => { res.send(data) });
});

module.exports = router;
