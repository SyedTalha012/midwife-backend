const childGrowthData = require("./stages.data");

const calculateEDDWeeksAndDays = (lmpDate) => {
    
    let lmp = new Date(lmpDate);
    let edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280);

    let today = new Date();
    let diffInDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
        return "Invalid LMP date";
    }

    let weeks = Math.floor(diffInDays / 7);
    let days = diffInDays % 7;

    let currentGrowthData = childGrowthData.find(data => data.week === weeks) || "No data available for this week";

    return { remaining: `${40 - weeks} weeks and ${6 - days} day${days !== 1 ? "s" : ""} remaining`, currentWeek: weeks, currentGrowthData };
};


module.exports = {calculateEDDWeeksAndDays}
