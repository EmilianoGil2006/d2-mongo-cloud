const express = require('express');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});