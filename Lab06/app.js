const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000, () => console.log('API en http://localhost:3000'));