var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  get_overview(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_overview'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_power_trend(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_power_trend'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_miner_ranking(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_miner_ranking'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_block_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_block_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_power_distribution(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_power_distribution'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_notice_list(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/system/api/notice/get_notice_list'),
      data,
      utils.getCommonHeaders(req)
    )
  },

}
