const express = require('express');

const routerTalker = express.Router();
const { readJson,
        writeJson,
        updateJson,
        deleteJson } = require('../readJson');
const { validateToken,
        validateTalkerName,
        validateTalkerAge,
        validateFormatDate,
        validateRate,
        validQuerys } = require('./validateTalker');

const fTalkerName = (talkers, query) => talkers.filter((talker) => talker.name.includes(query));
const fTalkerRt = (talkers, rate) => talkers.filter((talker) => talker.talk.rate === Number(rate));

routerTalker.get('/', async (_req, res) => {
    const talkers = await readJson();
    res.status(200).json(talkers);
});

routerTalker.get('/search', validateToken, validQuerys, async (req, res) => {
    const { q, rate } = req.query;
    const talkers = await readJson();
    if (rate && q) {
        const filteredTalkersName = fTalkerName(talkers, q);
        const filteredTalkers = fTalkerRt(filteredTalkersName, rate);
        return res.status(200).json(filteredTalkers);
    }
    if (q) {
        const filteredTalkers = fTalkerName(talkers, q);
        return res.status(200).json(filteredTalkers);
    }
    
    if (rate) {
        const filteredTalkers = fTalkerRt(talkers, rate);
      return res.status(200).json(filteredTalkers);
    }
  });

routerTalker.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readJson();
    const talker = talkers.find((talke) => talke.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
});

routerTalker.post(
    '/',
    validateToken,
    validateTalkerName,
    validateTalkerAge,
    validateFormatDate,
    validateRate,
    async (req, res) => {
    try {
        const { name, age, talk } = req.body;
        const { watchedAt, rate } = talk;
        const talkers = await readJson();
        const id = talkers.length + 1;
        const newTalker = { name, age, id, talk: { watchedAt, rate } };
        await writeJson(newTalker);
        res.status(201).json(newTalker);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar palestrante' });
    }
},
);

routerTalker.put('/:id',
    validateToken,
    validateTalkerName,
    validateTalkerAge,
    validateFormatDate,
    validateRate, async (req, res) => {
        const { id } = req.params;
        const { name, age, talk } = req.body;
        const { watchedAt, rate } = talk;
        const talkers = await readJson();
        const talker = talkers.find((talke) => talke.id === Number(id));
        if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        const updatedTalker = await updateJson({
             name, age, id: Number(id), talk: { watchedAt, rate } });
        res.status(200).json(updatedTalker);
});

routerTalker.delete('/:id', validateToken, async (req, res) => {
    const { id } = req.params;
    const talkers = await readJson();
    const talker = talkers.find((talke) => talke.id === Number(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    await deleteJson(Number(id));
    res.status(204).end();
});

module.exports = routerTalker;