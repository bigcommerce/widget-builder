const express = require('express');

const app = express();

app.use(express.static('dist'));
app.get('/', (req, res) => res.send('Hello Widget Builder!'));
app.get('/api/getTitle', (req, res) => res.send({ title: 'Widget Builder' }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
