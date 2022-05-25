const calcSeats = (collegeSeatsWithId) => {
  let x = 0;

  for (const c in collegeSeatsWithId) {
    for (const d in collegeSeatsWithId[c]) {
      x += collegeSeatsWithId[c][d];
    }
  }

  return x;
};

const seatAllocation = (studentMeritList, collegeSeatsWithId) => {
  const finalAllocation = [];
  const remainingStudents = [];

  let totalSeats = calcSeats(collegeSeatsWithId);

  studentMeritList.sort((a, b) => a.generalRank - b.generalRank);

  for (let j = 0; j < studentMeritList.length; ++j) {
    let generalPreference = null;
    let categoryPreference = null;
    const student = studentMeritList[j];
    //console.log(student);

    for (let i = 0; i < student.preferences.length; ++i) {
      if (collegeSeatsWithId[student.preferences[i]].general_seats > 0) {
        generalPreference = i;
        break;
      }
    }

    if (student.category) {
      for (let i = 0; i < student.preferences.length; ++i) {
        if (
          collegeSeatsWithId[student.preferences[i]][
            `${student.category}_seats`
          ] > 0
        ) {
          categoryPreference = i;
          break;
        }
      }
    }

    let preference = null;
    if (generalPreference === null && categoryPreference === null) {
      remainingStudents.push(student);
      continue;
    } else if (generalPreference === null) preference = categoryPreference;
    else if (categoryPreference === null) preference = generalPreference;
    else preference = Math.min(generalPreference, categoryPreference);

    // Check if this allotment is better than the last allotment or there was no last allotment
    if (
      student.currentSeatIndex === null ||
      preference < student.currentSeatIndex
    ) {
      if (student.currentSeatIndex === null) {
        if (preference === generalPreference) {
          --collegeSeatsWithId[student.preferences[preference]].general_seats;
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: "general",
          });
          student.seatAllotmentCategory = "general";
        } else {
          --collegeSeatsWithId[student.preferences[preference]][
            `${student.category}_seats`
          ];
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: student.category,
          });
          student.seatAllotmentCategory = student.category;
        }
      } else {
        ++collegeSeatsWithId[student.preferences[student.currentSeatIndex]][
          `${student.seatAllotmentCategory}_seats`
        ];
        if (preference === generalPreference) {
          --collegeSeatsWithId[student.preferences[preference]].general_seats;
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: "general",
          });
          student.seatAllotmentCategory = "general";
        } else {
          --collegeSeatsWithId[student.preferences[preference]][
            `${student.category}_seats`
          ];
          finalAllocation.push({
            studentRegNo: student.regNo,
            allotedCollegeId: student.preferences[preference],
            category: student.category,
          });
          student.seatAllotmentCategory = student.category;
        }
      }
      student.currentSeatIndex = preference;
    } else {
      // remainingStudents.push(student);
      // console.log("hi");
    }
  }

  let remainingSeats = calcSeats(collegeSeatsWithId);
  const summary = `
  Total No of Colleges Seats= ${totalSeats},
  Total No of Merit Students = ${studentMeritList.length},
  Total No of Seats Allocated = ${finalAllocation.length},
  Total Remaining College Seats = ${remainingSeats},
  Total Remaining Unalloted Students = ${remainingStudents.length},
  `;
  console.log(summary);
  return {
    finalAllocation,
    remainingStudents,
    remainingCollegeSeats: collegeSeatsWithId,
    noOfSeatsRemaining: remainingSeats,
    updatedStudentsList: studentMeritList,
  };
};

module.exports = seatAllocation;
