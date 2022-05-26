const phaseData = require("../constants/phaseData");

module.exports = (req, res, next, phase = "RNS") => {
  if (phase == "AA") {
    return next();
  }
  const currentDate = new Date();
  const currentPhase = phaseData.filter((ph) => ph.phase == phase);
  const phaseStartDate = new Date(currentPhase[0].start);
  const phaseEndDate = new Date(currentPhase[0].end);

  if (currentDate > phaseStartDate && currentDate < phaseEndDate) {
    next();
  } else {
    res.status(400).json({ success: false, message: "Not Avilable" });
  }
};
