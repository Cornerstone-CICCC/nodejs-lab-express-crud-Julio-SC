import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { Employee } from '../types/employee'

const employeeRouter = Router()

const employee: Employee[] = [
    { id: '1', firstname: "Bob", lastname: "Green", age: 23, isMarried: true},
    { id: '2', firstname: "Luke", lastname: "Skywalker", age: 60, isMarried: false},
    { id: '3', firstname: "Jennifer", lastname: "Wayne", age: 28, isMarried: true}
]

// Get All Employees
employeeRouter.get("/employees", (req: Request, res: Response) => {
    res.status(200).json(employee)
})

//GET /employees search / http://localhost:3500/search?firstname=Bob
employeeRouter.get("/search", (req: Request<{}, {}, {}, {firstname: String}>, res: Response) => {
const {firstname} = req.query
const foundname: Employee[] = employee.filter(employee => employee.firstname.toLowerCase().includes(firstname.toLowerCase()))
res.status(200).json(foundname)
})

// Get Employees by ID / http://localhost:3500/employees/2
employeeRouter.get("/employees/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const employeeFound = employee.find(employee => employee.id === id)
    if (!employeeFound) {
        res.status(404).send("Employee not found")
        return
    }
    res.status(200).json(employeeFound)
})

//Post *Add Employee
employeeRouter.post("/employees", (req: Request<{}, {}, Omit<Employee, 'id'>>, res: Response) => {
    const newEmployee: Employee = {
        id: uuidv4(),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        isMarried: req.body.isMarried
    }
    employee.push(newEmployee)
    res.status(201).json(newEmployee)
})

// Put Employees *Update Employee
employeeRouter.put("/employees/:id", (req: Request<{ id: string }, {}, Partial<Employee>>, res: Response) => {
    const { id } = req.params
    const employeeFound = employee.findIndex(employee => employee.id === id)
    if (employeeFound === -1) {
        res.status(404).send("Product not found")
        return
    }
    const updateEmployee: Employee = {
        ...employee[employeeFound],
        firstname: req.body.firstname ?? employee[employeeFound].firstname,
        lastname: req.body.lastname ?? employee[employeeFound].lastname,
        age: req.body.age ?? employee[employeeFound].age,
        isMarried: req.body.isMarried ?? employee[employeeFound].isMarried
    }
    employee[employeeFound] = updateEmployee
    res.status(200).json(updateEmployee)
})

// DELETE employees * Delete Employee by id

employeeRouter.delete("/employees/:id", (req: Request, res: Response) => {
    const { id } = req.params
    const employeeFound = employee.findIndex(employee => employee.id === id)
    if (employeeFound === -1) {
        res.status(404).send("Employee not found")
        return
    }
    employee.splice(employeeFound, 1)
    res.status(200).send("Employee deleted successfully")
})


export default employeeRouter