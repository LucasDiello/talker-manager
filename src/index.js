const express = require('express');
const routerTalker = require('./routes/talker_router');
const app = express();
app.use(express.json());
app.use('/talker', routerTalker);
const HTTP_OK_STATUS = 200;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const PORT = process.env.PORT || '3001';

app.listen(PORT, async () => {
    console.log('Online?');
  });
  
