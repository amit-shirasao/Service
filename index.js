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
    employeeModel.find()
        .then(employees => res.send(employees));
});

app.get('/:id', (req, res) => {
    const { id } = req.params;
    employeeModel.findById(id)
        .then(employee => {
            if (employee) {
                res.send(employee);
            } else {
                res.status(404).send('Employee not found');
            }
        });
});

app.post('/', (req, res) => {
    const newEmployee = req.body;

    employeeModel.create(newEmployee)
        .then(employee => res.send(`Employee created: ${JSON.stringify(employee)}`))
});

app.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    await employeeModel.updateOne({ _id: id }, { $set: updatedEmployee }).then(() => {
        res.send(`Employee with ID: ${id} updated`);
    });
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;
    employeeModel.deleteOne({ _id: id }).then(() => {
        res.send(`Employee with ID: ${id} deleted`);
    });
});