"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProject = exports.getProjectByName = exports.createProject = exports.getProjectsPage = exports.createProjectPage = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//ba63f704-9383-406a-8bc6-2868431a9c42
const createProjectPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectPageSchema = zod_1.default.object({
            projectHeading: zod_1.default.string(),
            portfolioId: zod_1.default.string(),
        });
        const results = projectPageSchema.safeParse(req.body);
        if (results.error) {
            res.status(400).json({
                message: results.error,
            });
            return;
        }
        const { projectHeading, portfolioId } = results.data;
        const response = yield prisma.projectSection.create({
            data: {
                projectHeading,
                portfolioId,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Something went wrong",
            });
            return;
        }
        res.status(200).json({
            message: "Successfully created Projects page",
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.createProjectPage = createProjectPage;
const getProjectsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectsPage = yield prisma.projectSection.findFirst({
            where: {
                portfolioId: "ba63f704-9383-406a-8bc6-2868431a9c42",
            },
            select: {
                projects: true,
                portfolioId: true,
                projectHeading: true,
                id: true,
            },
        });
        if (!projectsPage) {
            res.status(404).json({
                message: "No Projects page found !",
            });
            return;
        }
        res.status(200).json({
            message: "Successfully fetched projects page",
            projectsPage: projectsPage,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getProjectsPage = getProjectsPage;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projectSchema = zod_1.default.object({
            projectName: zod_1.default.string(),
            projectHeading: zod_1.default.string(),
            projectDescription: zod_1.default.string(),
            techStack: zod_1.default.array(zod_1.default.string()),
            features: zod_1.default.array(zod_1.default.string()),
            challenges: zod_1.default.array(zod_1.default.string()),
            learnings: zod_1.default.array(zod_1.default.string()),
            githubLink: zod_1.default.string().url(),
            deployedLink: zod_1.default.string().url().optional(),
            projectSectionId: zod_1.default.string(),
        });
        const results = projectSchema.safeParse(req.body);
        if (results.error) {
            res.status(400).json({
                message: results.error,
            });
            return;
        }
        const { projectName, projectHeading, projectDescription, techStack, features, challenges, learnings, githubLink, deployedLink, projectSectionId, } = results.data;
        const response = yield prisma.project.create({
            data: {
                projectName,
                projectHeading,
                projectDescription,
                techStack,
                features,
                challenges,
                learnings,
                githubLink,
                deployedLink,
                projectSection: {
                    connect: { id: projectSectionId },
                },
            },
        });
        if (!response) {
            res.status(200).json({
                message: `${projectName} Failed to crearte `,
            });
            return;
        }
        res.status(200).json({
            message: "Projects created successfully",
            response,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.createProject = createProject;
const getProjectByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectName } = req.params;
        if (!(projectName === null || projectName === void 0 ? void 0 : projectName.trim())) {
            res.status(401).json({
                message: "All fields are required !",
            });
            return;
        }
        const results = yield prisma.project.findFirst({
            where: {
                projectName,
            },
        });
        if (!results) {
            res.status(404).json({
                message: "Np project found !",
            });
            return;
        }
        res.status(200).json({
            message: "Project fetched successfully",
            results,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.getProjectByName = getProjectByName;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, projectName, projectDescription, githubLink, deployedLink } = req.body;
        if (!id.trim()) {
            res.status(400).json({
                message: "Project id required",
            });
            return;
        }
        const updateData = {};
        if (projectName !== undefined)
            updateData.projectName = projectName;
        if (projectDescription !== undefined)
            updateData.projectDescription = projectDescription;
        if (githubLink !== undefined)
            updateData.githubLink = githubLink;
        if (deployedLink !== undefined)
            updateData.deployedLink = deployedLink;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No fields to update !",
            });
            return;
        }
        const updatedProject = yield prisma.project.update({
            where: {
                id,
            },
            data: updateData,
        });
        if (!exports.updateProject) {
            res.status(400).json({
                messaeg: "Failed to update project",
            });
        }
        res.status(200).json({
            message: "Project updated successfully",
            updatedProject,
        });
    }
    catch (error) {
        console.log(error);
        const err = error;
        res.status(500).json({
            message: "Internal server error",
            error: err.message,
        });
    }
});
exports.updateProject = updateProject;
