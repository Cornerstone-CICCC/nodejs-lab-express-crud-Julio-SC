"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const employeeRouter = (0, express_1.Router)();
const employee = [
    { id: '1', firstname: "Bob", lastname: "Green", age: 23, isMarried: true },
    { id: '2', firstname: "Luke", lastname: "Skywalker", age: 60, isMarried: false },
    { id: '3', firstname: "Jennifer", lastname: "Wayne", age: 28, isMarried: true }
];
// Get All Employees
employeeRouter.get("/employees", (req, res) => {
    res.status(200).json(employee);
});
//GET /employees search / http://localhost:3500/search?firstname=Bob
employeeRouter.get("/search", (req, res) => {
    const { firstname } = req.query;
    const foundname = employee.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()));
    res.status(200).json(foundname);
});
// Get Employees by ID / http://localhost:3500/employees/2
employeeRouter.get("/employees/:id", (req, res) => {
    const { id } = req.params;
    const employeeFound = employee.find(employee => employee.id === id);
    if (!employeeFound) {
        res.status(404).send("Employee not found");
        return;
    }
    res.status(200).json(employeeFound);
});
//Post *Add Employee
employeeRouter.post("/employees", (req, res) => {
    const newEmployee = {
        id: (0, uuid_1.v4)(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    };
    employee.push(newEmployee);
    res.status(201).json(newEmployee);
});
// Put Employees *Update Employee
employeeRouter.put("/employees/:id", (req, res) => {
    var _a, _b, _c, _d;
    const { id } = req.params;
    const employeeFound = employee.findIndex(employee => employee.id === id);
    if (employeeFound === -1) {
        res.status(404).send("Product not found");
        return;
    }
    const updateEmployee = Object.assign(Object.assign({}, employee[employeeFound]), { firstname: (_a = req.body.firstname) !== null && _a !== void 0 ? _a : employee[employeeFound].firstname, lastname: (_b = req.body.lastname) !== null && _b !== void 0 ? _b : employee[employeeFound].lastname, age: (_c = req.body.age) !== null && _c !== void 0 ? _c : employee[employeeFound].age, isMarried: (_d = req.body.isMarried) !== null && _d !== void 0 ? _d : employee[employeeFound].isMarried });
    employee[employeeFound] = updateEmployee;
    res.status(200).json(updateEmployee);
});
// DELETE employees * Delete Employee by id
employeeRouter.delete("/employees/:id", (req, res) => {
    const { id } = req.params;
    const employeeFound = employee.findIndex(employee => employee.id === id);
    if (employeeFound === -1) {
        res.status(404).send("Employee not found");
        return;
    }
    employee.splice(employeeFound, 1);
    res.status(200).send("Employee deleted successfully");
});
exports.default = employeeRouter;
