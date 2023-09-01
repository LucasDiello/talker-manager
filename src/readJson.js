const fs = require('fs').promises;
const { resolve } = require('path');

const readJson = async () => {
    try {
        const content = await fs.readFile(resolve(__dirname, './talker.json'), 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error(`Erro ao ler o arquivo: ${err.message}`);
    }
};  

const writeJson = async (data) => {
    const oldData = await readJson();
    const newData = [...oldData, data];
    try {
        await fs.writeFile(resolve(__dirname, './talker.json'), JSON.stringify(newData));
    } catch (err) {
        console.error(`Erro ao escrever no arquivo: ${err.message}`);
    }
};
module.exports = { readJson, writeJson };