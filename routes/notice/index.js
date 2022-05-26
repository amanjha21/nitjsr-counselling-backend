const router = require("express").Router();
const controller = require("../../controllers");
const {
  isAuthenticatedAdmin,
} = require("../../middlewares/admin/isAuthenticatedAdmin");
const validation = require("../../middlewares/validation");
const validationSchema = require("./validationSchema");
const phaseMiddleware = require("../../middlewares/phaseMiddleware");
router.get(
  "/get",
  (req, res, next) => phaseMiddleware(req, res, next, "AA"),
  controller.notice.getNotices
);
router.post(
  "/create",
  (req, res, next) => isAuthenticatedAdmin(req, res, next, ["c", "s"]),
  (req, res, next) => phaseMiddleware(req, res, next, "AA"),
  validation(validationSchema.createNoticeValidation),
  controller.notice.createNotice
);

module.exports = router;
