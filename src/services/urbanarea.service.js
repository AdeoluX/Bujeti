const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');
const { TeleportService } = require('../ThirdPartyServices/teleport.service');

class UrbanAreaService {
  /**
   * Service to the list african urban areas
   * @returns {(string|Array)}
   */
  static listUrbanAreas = async () => {
    const list = await TeleportService.getUrbanAreas();
    let result = [];
    for (var item of list._links['ua:items']) {
      result.push(item.name);
    }
    return result;
  };
  /**
   * Service to the getDetails Controller
   * @returns {object}
   */
  static urbanAreaDetails = async (area) => {
    abortIf(
      area.includes(' '),
      httpStatus.BAD_REQUEST,
      'Please use a dash "-" to seperate words'
    );
    let promise = [];
    const salaries = await TeleportService.getUrbanAreaSalaries(area);
    const image = await TeleportService.getUrbanAreaImage(area);
    const scores = await TeleportService.getUrbanAreaScoreOfLiving(area);
    const return_object = {
      average_salary: salaries,
      image: image,
      score_of_living: scores,
    };
    promise.push(return_object);
    const result = await Promise.all(promise);
    return result;
  };
}

module.exports = {
  UrbanAreaService,
};
