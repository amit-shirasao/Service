const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.listen(4000, () => {
    console.log('Express app listening on port 4000');
});

app.get('/', (req, res) => {
    res.send('Get all employees.');
});
