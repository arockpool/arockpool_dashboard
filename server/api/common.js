var utils = require('../common/utils.js');

module.exports = {
  get_calculate_info(data, req) {
    return utils.promiseRequest(
      utils.getServerUrl('/activity/api/calculator/get_calculate_info'),
      data,
      utils.getCommonHeaders(req)
    )
  },
}
