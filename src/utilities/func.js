const validRate = (rate) => Number(rate) >= 1
&& Number(rate) <= 5 && Number.isInteger(Number(rate));

const conditionQuerys = (q, rate, date) => (!q && !rate && !date);

const conditionalDate = (dateRegex, date) => (!dateRegex.test(date) && date);

module.exports = {
    validRate,
    conditionQuerys,
    conditionalDate,
};