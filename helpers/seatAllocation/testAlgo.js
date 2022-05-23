const fs = require("fs").promises;
const generateRandomData = require("./randomStudentMeritGenerator");
const collegeSeatsWithId = require(".././../constants/collegeSeatsWithId");
const seatAllocation = require("./seatAllocation");

const getData = async () => {
  // const studentMeritList = require(".././../constants/studentMeritList");
  //auto generated data
  const data = await fs.readFile("./temp/randomStudentMeritList.json", "utf8");
  const studentMeritList = JSON.parse(data);
  //---------------------------------
  return studentMeritList;
};

const STARTALLOCATION = async () => {
  console.log("Testing Started");
  console.log("Generating Random Test Data");

  await generateRandomData(15000, 5);
  let studentMeritList = await getData();

  console.log("Starting 1st phase of Allocation");

  let firstPhaseAllocation = seatAllocation(
    studentMeritList,
    collegeSeatsWithId
  );

  let jsonString = JSON.stringify(firstPhaseAllocation.finalAllocation);
  await fs.writeFile("./temp/firstPhaseResult.json", jsonString);

  console.log("1st phase Completed");

  if (firstPhaseAllocation.remainingStudents.length == 0) {
    console.log("all students got alloted");
    return;
  } else if (firstPhaseAllocation.noOfSeatsRemaining == 0) {
    console.log("all college seats filled");
    return;
  }

  console.log("Starting 2nd phase of Allocation");
  let secondPhaseMeritList = firstPhaseAllocation.remainingStudents;
  const secondPhaseCollegeList = firstPhaseAllocation.remainingCollegeSeats;
  console.log("Genetrating random choice of float and reject");

  let allAllocatedStudent = firstPhaseAllocation.updatedStudentsList.filter(
    (stu) => stu.currentSeatIndex != null
  );
  for (
    let i = 0;
    i < allAllocatedStudent.length;
    i += Math.floor(Math.random() * 11 + 3)
  ) {
    let student = allAllocatedStudent[i];
    if (i % 2) {
      //random float
      secondPhaseMeritList.push(student);
    } else {
      //random reject
      secondPhaseMeritList = secondPhaseMeritList.filter(
        (stu) => stu.regNo != student.regNo
      );
      ++secondPhaseCollegeList[student.preferences[student.currentSeatIndex]][
        `${student.seatAllotmentCategory}_seats`
      ];
    }
  }

  jsonString = JSON.stringify(secondPhaseMeritList);
  await fs.writeFile("./temp/secondPhaseMeritList.json", jsonString);

  let secondPhaseAllocation = seatAllocation(
    secondPhaseMeritList,
    secondPhaseCollegeList
  );

  jsonString = JSON.stringify(secondPhaseAllocation.finalAllocation);
  await fs.writeFile("./temp/secondPhaseResult.json", jsonString);

  console.log("2nd phase Completed");

  if (secondPhaseAllocation.remainingStudents.length == 0) {
    console.log("all students got alloted");
    return;
  } else if (secondPhaseAllocation.noOfSeatsRemaining == 0) {
    console.log("all college seats filled");
    return;
  }

  console.log("Starting 3rd phase of Allocation");
  let thirdPhaseMeritList = secondPhaseAllocation.remainingStudents;
  const thirdPhaseCollegeList = secondPhaseAllocation.remainingCollegeSeats;
  console.log("Genetrating random choice of float");

  allAllocatedStudent = secondPhaseAllocation.updatedStudentsList.filter(
    (stu) => stu.currentSeatIndex != null
  );

  for (
    let i = 0;
    i < allAllocatedStudent.length;
    i += Math.floor(Math.random() * 11 + 3)
  ) {
    let student = allAllocatedStudent[i];
    if (i % 2) {
      //random float
      thirdPhaseMeritList.push(student);
    } else {
      //random reject
      thirdPhaseMeritList = thirdPhaseMeritList.filter(
        (stu) => stu.regNo != student.regNo
      );
      ++thirdPhaseCollegeList[student.preferences[student.currentSeatIndex]][
        `${student.seatAllotmentCategory}_seats`
      ];
    }
  }
  jsonString = JSON.stringify(thirdPhaseMeritList);
  await fs.writeFile("./temp/thirdPhaseMeritList.json", jsonString);

  let thirdPhaseAllocation = seatAllocation(
    thirdPhaseMeritList,
    thirdPhaseCollegeList
  );

  jsonString = JSON.stringify(thirdPhaseAllocation.finalAllocation);
  await fs.writeFile("./temp/thirdPhaseResult.json", jsonString);

  console.log("3rd phase Completed");

  if (thirdPhaseAllocation.remainingStudents.length == 0) {
    console.log("all students got alloted");
    return;
  } else if (thirdPhaseAllocation.noOfSeatsRemaining == 0) {
    console.log("all college seats filled");
    return;
  }
};

module.exports = STARTALLOCATION;

STARTALLOCATION();
