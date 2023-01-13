// const catchAsync = require('../utils/catchAsync');
const catchAsync = require('../utils/catchAsync');
const { UrbanAreaService } = require('../services');
const { successResponse } = require('../utils/responder');

class UrbanServiceController {
  static listAllUrbanAreas = catchAsync(async (req, res, next) => {
    const urbanAreas = await UrbanAreaService.listUrbanAreas();
    return successResponse(req, res, urbanAreas);
  });

  static getDetailsOfUrbanArea = catchAsync(async (req, res, next) => {
    const customer = await UrbanAreaService.urbanAreaDetails(
      req.query.area.toLowerCase()
    );
    return successResponse(req, res, customer);
  });
}

module.exports = {
  UrbanServiceController,
};
