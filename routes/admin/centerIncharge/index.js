const router = require("express").Router();
const controllers = require("../../../controllers");
const validation = require("../../../middlewares/validation");
const validationSchema = require("./validationSchema");
const {
  isAuthenticatedAdmin,
} = require("../../../middlewares/admin/isAuthenticatedAdmin");
const multerMiddleware = require("../../../middlewares/multerMiddleware");
const multerSingle = require("../../../middlewares/multerSingle");

//create Center Incharge route
router.post(
  "/create",
  // (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  (req, res, next) =>
    multerMiddleware(req, res, next, [
      { name: "profileImage", maxCount: 1 },
      { name: "signature", maxCount: 1 },
      { name: "aadhaar", maxCount: 1 },
      { name: "classTen", maxCount: 1 },
      { name: "classTwelve", maxCount: 1 },
      { name: "firstYear", maxCount: 1 },
      { name: "secondYear", maxCount: 1 },
      { name: "thirdYear", maxCount: 1 },
    ]),
  // validation(validationSchema.createCenterInchargeValidation),
  controllers.admin.createCenterIncharge
);
// delete Center Incharge route
router.delete(
  "/delete",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  validation(validationSchema.deleteCenterInchargeValidation),
  controllers.admin.deleteCenterIncharge
);
// get Center Incharge route
router.get(
  "/",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  controllers.admin.getCenterIncharge
);
//update Center Incharge Details Route
router.post(
  "/update",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  multerSingle,
  validation(validationSchema.updateCenterInchargeValidation),
  controllers.admin.updateCenterIncharge
);

module.exports = router;
