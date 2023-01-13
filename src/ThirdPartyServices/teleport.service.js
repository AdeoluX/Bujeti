const httpStatus = require('http-status/lib');
const { Request } = require('../utils/ApiCall');
const { abortIf } = require('../utils/responder');

class TeleportService {
  /**
   * =>Takes no arguments
   * =>calls the teleport endpoint
   * =>returns list of urban areas in Africa
   * @returns {object}
   */
  static getUrbanAreas = async () => {
    const apicall = await Request['axiosGET'](
      `${process.env.TELEPORT_BASE_URL}/continents/geonames:AF/urban_areas/`
    );
    return apicall.data;
  };
  /**
   * Takes urban area and returns image object
   * @param {string} urban_area
   * @returns {object}
   */
  static getUrbanAreaImage = async (urban_area) => {
    try {
      const apicall = await Request['axiosGET'](
        `${process.env.TELEPORT_BASE_URL}/urban_areas/slug:${urban_area}/images`
      );
      return apicall.data.photos[0].image;
    } catch (e) {
      abortIf(e, e.response.status, e.response.statusText);
    }
  };
  /**
   * Takes urban area and returns calculated average salary
   * @param {string} urban_area
   * @returns {object}
   */
  static getUrbanAreaSalaries = async (urban_area) => {
    try {
      const apicall = await Request['axiosGET'](
        `${process.env.TELEPORT_BASE_URL}/urban_areas/slug:${urban_area}/salaries`
      );
      // console.log(apicall.data.salaries);
      abortIf(!apicall.data, httpStatus.FAILED_DEPENDENCY, 'kkkk');
      let total_50_percentile = 0,
        total_75_percentile = 0,
        total_25_percentile = 0;

      let count = 0;
      for (var amount of apicall.data.salaries) {
        total_50_percentile =
          total_50_percentile + Number(amount.salary_percentiles.percentile_50);
        total_25_percentile =
          total_25_percentile + Number(amount.salary_percentiles.percentile_25);
        total_75_percentile =
          total_75_percentile + Number(amount.salary_percentiles.percentile_75);
        count = count + 1;
      }
      const average_percentiles = {
        average_percentile_25: total_25_percentile / count,
        average_percentile_50: total_50_percentile / count,
        average_percentile_75: total_75_percentile / count,
      };
      return average_percentiles;
    } catch (e) {
      abortIf(e, e.response.status, e.response.statusText);
    }
  };
  /**
   * Takes urban area and returns score of living
   * @param {string} urban_area
   * @returns {number}
   */
  static getUrbanAreaScoreOfLiving = async (urban_area) => {
    try {
      const apicall = await Request['axiosGET'](
        `${process.env.TELEPORT_BASE_URL}/urban_areas/slug:${urban_area}/scores`
      );
      return apicall.data.teleport_city_score;
    } catch (e) {
      abortIf(e, e.response.status, e.response.statusText);
    }
  };
}

module.exports = {
  TeleportService,
};
