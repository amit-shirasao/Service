const mongoose = require('mongoose');
const express = require('express');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const employeeSchema = new mongoose.Schema({
    name: String,
    city: String
});

const employeeModel = mongoose.model('Employee', employeeSchema);

const mongoDbEmployeeClusterUrl = 'mongodb+srv://amitshirasao:NheQWnPzz5GF0ges@employee.3dve12s.mongodb.net/';
mongoose.connect(mongoDbEmployeeClusterUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000, () => {
        console.log('Express app listening on port 4000');
    });
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

    employeeModel.create(newEmployee)
        .then(employee => res.send(`Employee created: ${JSON.stringify(employee)}`))
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