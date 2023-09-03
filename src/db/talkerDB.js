const conn = require('./connection');

const getAll = async () => {
    const [rows] = await conn.execute('SELECT * FROM talkers');
    const talkers = rows.map((talker) => ({
        name: talker.name,
        age: talker.age,
        id: talker.id,
        talk: {
            watchedAt: talker.talk_watched_at,
            rate: talker.talk_rate,
        },
    }));
    return [talkers];
};

module.exports = {
    getAll,
};