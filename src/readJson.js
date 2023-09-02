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

const updateJson = async (data) => {
    const oldData = await readJson();
    const updateData = { ...data };
    const updated = oldData.reduce((acc, curr) => 
        (curr.id === updateData.id ? [...acc, updateData] : [...acc, curr]),
         []);
    await fs.writeFile(resolve(__dirname, './talker.json'), JSON.stringify(updated));
    return updateData;
};

const deleteJson = async (id) => {
    const oldData = await readJson();
    const updated = oldData.filter((talker) => talker.id !== id);
    await fs.writeFile(resolve(__dirname, './talker.json'), JSON.stringify(updated));
};

module.exports = { readJson, writeJson, updateJson, deleteJson };