const { readJson } = require('../readJson');
const { conditionQuerys, conditionalRate } = require('../utilities/func');

const validateToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });
    if (authorization.length !== 16) return res.status(401).json({ message: 'Token inválido' });
    next();
};

const validateFormatDate = (req, res, next) => {
    const { talk } = req.body; 
    if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    const { watchedAt } = talk;
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    if (!dateRegex.test(watchedAt)) {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}
    next();
};

const validateRate = (req, res, next) => {
    const { talk } = req.body;
    const rate = talk ? talk.rate : req.body.rate;
    if (rate === undefined) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (conditionalRate(rate)) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    next();
};

const validateTalkerName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
 return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}
    next();
};

const validateTalkerAge = (req, res, next) => {
    const { age } = req.body;

    if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
}
    if (!Number.isInteger(age) || age < 18) {
        return res.status(400)
        .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    if (!Number(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um número' });
}
next();
};

const validQuerys = async (req, res, next) => {
  const { q, rate, date } = req.query;
  const talkers = await readJson();
  if (conditionQuerys(q, rate, date)) return res.status(200).json(talkers);
  if (conditionQuerys(q, !conditionalRate(rate), date)) {
 return res.status(400)
        .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' }); 
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