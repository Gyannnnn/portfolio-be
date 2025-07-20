"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const user_auth_1 = __importDefault(require("./Routes/auth/user.auth"));
const portfolio_1 = __importDefault(require("./Routes/portfolio/portfolio"));
const intro_routes_1 = __importDefault(require("./Routes/introduction/intro.routes"));
const aboutpage_routes_1 = __importDefault(require("./Routes/about/aboutpage.routes"));
const projectsPage_routes_1 = __importDefault(require("./Routes/projects/projectsPage.routes"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1/auth", user_auth_1.default);
app.use("/api/v1/pf", portfolio_1.default);
app.use("/api/v1/intro", intro_routes_1.default);
app.use("/api/v1/about", aboutpage_routes_1.default);
app.use("/api/v1/projects", projectsPage_routes_1.default);
console.log(process.env.PORT);
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running at http://localhost${process.env.PORT || 3000}`);
});
