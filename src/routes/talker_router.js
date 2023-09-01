const express = require('express');
const routerTalker = express.Router();
const { readJson } = require('../readJson');

routerTalker.get('/', async (_req, res) => {
    const talkers = await readJson();
    res.status(200).json(talkers);
})

routerTalker.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readJson();
    const talker = talkers.find((talker) => talker.id === parseInt(id));
    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talker);
});
module.exports = routerTalker;