var utils = require('../common/utils.js');
var consts = require('../common/consts.js');

module.exports = {

  get_pool_overview(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_pool_overview'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_pool_miners(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_pool_miners'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_pool_trend(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_pool_trend'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_pool_mines(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_pool_mines'),
      data,
      utils.getCommonHeaders(req)
    )
  },
  get_pool_last_block_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/dashboard/v2/get_pool_last_block_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },

}
