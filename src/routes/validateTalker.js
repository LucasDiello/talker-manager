const { readJson } = require('../readJson');
const { conditionQuerys, conditionalRate } = require('../utilities/func');
const messages = require('../messages');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    next();
};

const validateFormatDate = (req, res, next) => {
    const { talk } = req.body; 
    if (!talk) {
    return res.status(400).json({ message: messages.talk });
    }
    const { watchedAt } = talk;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!watchedAt) {
    return res.status(400).json({ message: messages.watchedAt });
    }
    if (!dateRegex.test(watchedAt)) {
 return res.status(400)
    .json({ message: messages.date }); 
}
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const rate = talk ? talk.rate : req.body.rate;
    if (rate === undefined) {
        return res.status(400).json({ message: messages.rate });
    }
    if (conditionalRate(rate)) {
        return res.status(400)
        .json({ message: messages.rateNumber });
    }
    next();
};

const validateTalkerName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
    return res.status(400).json({ message: messages.name });
    }
    if (name.length < 3) {
 return res.status(400)
    .json({ message: messages.nameLength }); 
}
    next();
};

const validateTalkerAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
    return res.status(400).json({ message: messages.age });
}
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400)
        .json({ message: messages.ageNumber });
    }
    if (!Number(age)) {
    return res.status(400).json({ message: messages.ageNumber2 });
}
next();
};

const validQuerys = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readJson();
  if (conditionQuerys(q, rate, date)) return res.status(200).json(talkers);
  if (conditionQuerys(q, !conditionalRate(rate), date)) {
 return res.status(400)
        .json({ message: messages.rateNumber }); 
}
  next();
};

module.exports = {
    validateToken,
    validateFormatDate,
    validateRate,
    validateTalkerName,
    validateTalkerAge,
    validQuerys,
};