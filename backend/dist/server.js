"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
dotenv_1.default.config();
// Create Server
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json()); // Allow JSON
app.use((0, cors_1.default)()); // Allow frontend to send requests
app.use("/", employee_routes_1.default);
app.use((req, res, next) => {
    res.status(404).send("404 Not Found");
});
// Start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
