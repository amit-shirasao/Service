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

app.get('/:id', (req, res) => {
    const { id } = req.params;      
    res.send(`Get employee with ID: ${id}`);
});

app.post('/', (req, res) => {
    const newEmployee = req.body;
    res.send(`Add new employee: ${JSON.stringify(newEmployee)}`);
});

app.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    res.send(`Update employee with ID ${id}: ${JSON.stringify(updatedEmployee)}`);
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Delete employee with ID: ${id}`);
});