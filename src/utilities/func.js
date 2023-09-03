const conditionQuerys = (q, rate, date) => (!q && !rate && !date);

const conditionalDate = (dateRegex, date) => (!dateRegex.test(date) && date);

const conditionalRate = (rate) => (rate <= 0 || rate > 5 || !Number.isInteger(Number(rate)));

module.exports = {
    conditionQuerys,
    conditionalDate,
    conditionalRate,
};