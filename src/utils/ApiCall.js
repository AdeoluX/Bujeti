const axios = require('axios');

class Request {
  static apiCall = async (method, url, data, extra = null) => {
    if (method === 'POST') {
      return await axios.post(url, data, { ...extra });
    }
    return await axios.get(url, { ...data });
  };

  static axiosGET = async (url, data = null) => {
    return this.apiCall('GET', url, data);
  };

  static axiosPOST = async (url, data, extra = null) => {
    return apiCall('POST', url, data, extra);
  };
}

module.exports = {
  Request,
};
