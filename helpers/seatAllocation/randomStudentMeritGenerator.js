const fs = require("fs").promises;

module.exports = async (number = 100, categoryAfter = 6) => {
  const x = [];
  const categories = [
    "sc",
    "st",
    "ews",
    "pwd",
    "obc",
    "pwd_general",
    "pwd_obc",
    "pwd_sc",
    "pwd_ews",
    "pwd_st",
  ];
  let data = {
    regNo: 0,
    generalRank: 0,
    category: "",
    categoryRank: "",
    preferences: [],
    currentSeatIndex: null,
    seatAllotmentCategory: null,
  };

  const currentCategoryRank = {
    sc: 0,
    st: 0,
    ews: 0,
    pwd: 0,
    obc: 0,
    pwd_general: 0,
    pwd_obc: 0,
    pwd_sc: 0,
    pwd_ews: 0,
    pwd_st: 0,
  };

  for (let i = 0; i < number; i++) {
    let regNo = i + 2;
    let generalRank = i + 1;

    const preferences = new Set();
    for (let j = 0; j < 10; j++)
      preferences.add(Math.floor(Math.random() * 9 + 1));
    // const preferences = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    if (i % categoryAfter == 0) {
      let category = categories[Math.floor(Math.random() * categories.length)];
      let categoryRank = ++currentCategoryRank[category];
      x.push({
        ...data,
        regNo,
        generalRank,
        category,
        categoryRank,
        preferences: [...preferences],
      });
    } else {
      x.push({ ...data, regNo, generalRank, preferences: [...preferences] });
    }
  }
  // return x;
  const json = JSON.stringify(x);
  await fs.writeFile("./temp/randomStudentMeritList.json", json, "utf8");
};
