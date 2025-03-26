const childGrowthData = require("./stages.data");

const calculateEDDWeeksAndDays = (lmpDate) => {

    lmpDate = lmpDate.replace(/[-]/g, "/");

    let [day, month, year] = lmpDate.split("/").map(Number);

    if (!day || !month || !year || month > 12 || day > 31) {
        return {
            error: "Invalid LMP date format. Please use dd/mm/yyyy or dd-mm-yyyy.",
            inputDate: lmpDate
        };
    }

    let lmp = new Date(`${year}-${month}-${day}`);

    if (isNaN(lmp.getTime())) {
        return {
            error: "Invalid LMP date format. Please use dd/mm/yyyy or dd-mm-yyyy.",
            inputDate: lmpDate
        };
    }

    let today = new Date();

    if (lmp > today) {
        return {
            error: "LMP date is in the future. Pregnancy hasn't started yet.",
            inputDate: lmpDate
        };
    }

    let edd = new Date(lmp);
    edd.setDate(edd.getDate() + 287);

    let diffInDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    let weeks = Math.floor(diffInDays / 7);
    let days = diffInDays % 7;

    let remainingWeeks = 41 - weeks;
    let remainingDays = 6 - days;

    let currentGrowthData = childGrowthData.find(data => data.week === weeks) || "No data available for this week";

    return {
        inputDate: lmpDate,
        remaining: `${remainingWeeks} weeks and ${remainingDays} day${remainingDays !== 1 ? "s" : ""} remaining`,
        currentWeek: weeks,
        currentGrowthData
    };
};

module.exports = { calculateEDDWeeksAndDays };

