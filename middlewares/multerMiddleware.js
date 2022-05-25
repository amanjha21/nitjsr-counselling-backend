const multer = require("multer");

module.exports = (
  req,
  res,
  next,
  fieldsArray = [{ name: "fileData", maxCount: 1 }]
) => {
  const upload = multer().fields(fieldsArray);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError || err) {
      return res.status(500).json({ success: false, message: err.message });
    }
    next();
  });
};
