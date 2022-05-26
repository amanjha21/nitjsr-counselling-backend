//phases enum
///////////////////////////
//RNS => Registration Not Started
//RS => Registration Started
//RC => Registration Completed

//FRG => First Phase Result Generation
//FV => First Phase Verification
//FSA => First Phase Student Action
//FPC => First Phase Complete

//SRG => Second Phase Result Generation
//SV => Second Phase Verification
//SSA => Second Phase Student Action
//SPC => Second Phase Complete

//TRG => Third Phase Result Generation
//TV => Third Phase Verification
//TSA => Third Phase Student Action
//TPC => Third Phase Complete

//Start time is in GMT +5:30 i.e Indian Time
//Phase always changes at 12:00PM
let phaseList = [
  { phase: "RNS", start: "26 May 2022" },
  { phase: "RS", start: "27 May 2022" },
  { phase: "RC", start: "28 May 2022" },
  { phase: "FRG", start: "29 May 2022" },
  { phase: "FV", start: "30 May 2022" },
  { phase: "FSA", start: "31 May 2022" },
  { phase: "FPC", start: "01 Jun 2022" },
  { phase: "SRG", start: "02 Jun 2022" },
  { phase: "SV", start: "03 Jun 2022" },
  { phase: "SSA", start: "04 Jun 2022" },
  { phase: "SPC", start: "05 Jun 2022" },
  { phase: "TRG", start: "06 Jun 2022" },
  { phase: "TV", start: "07 Jun 2022" },
  { phase: "TSA", start: "08 Jun 2022" },
  { phase: "TPC", start: "09 Jun 2022" },
];
phaseList = phaseList.map((phase, i) => ({
  phase: phase.phase,
  start: phase.start + " 00:00:00 GMT +5:30",
  end: (phaseList[i + 1]?.start || phaseList[0].start) + " 00:00:00 GMT +5:30",
}));

module.exports = phaseList;
