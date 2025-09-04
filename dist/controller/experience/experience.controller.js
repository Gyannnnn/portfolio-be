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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewExperience = exports.updateExperienceSection = exports.getExperienceSection = exports.createExperienceSection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const portfolioId = process.env.PF_ID;
const createExperienceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { experienceHeading, experienceDescription } = req.body;
    if (!experienceHeading.trim() || !experienceDescription.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const expSection = yield prisma.experienceSection.create({
            data: {
                experienceDescription,
                experienceHeading,
                portfolioId,
            },
        });
        if (!expSection) {
            res.status(400).json({
                message: "Failed to create experience section",
            });
            return;
        }
        res.status(201).json({
            message: "Experience section created successfully",
            expSection,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});
exports.createExperienceSection = createExperienceSection;
const getExperienceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const experienceSection = yield prisma.experienceSection.findFirst({
            where: {
                portfolioId,
            },
            select: {
                id: true,
                experienceHeading: true,
                experienceDescription: true,
                portfolioId: true,
                experience: true,
            },
        });
        if (!experienceSection) {
            res.status(400).json({
                message: "Failed to fetch experience section",
            });
            return;
        }
        res.status(200).json({
            message: "Experience section fetched",
            experienceSection,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});
exports.getExperienceSection = getExperienceSection;
const updateExperienceSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { experienceHeading, experienceDescription } = req.body;
        const updateData = {};
        if (experienceHeading !== undefined)
            updateData.experienceHeading = experienceHeading;
        if (experienceDescription !== undefined)
            updateData.experienceDescription = experienceDescription;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No fields to update !",
            });
            return;
        }
        const updatedExperienceSection = yield prisma.experienceSection.update({
            where: {
                portfolioId
            },
            data: updateData,
        });
        res.status(200).json({
            message: "Experience section updated successfully",
            updatedExperienceSection,
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
exports.updateExperienceSection = updateExperienceSection;
const addNewExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { experienceName, joiningDate, experienceDescription, experienceSectionId, } = req.body;
    if (!experienceName.trim() ||
        !joiningDate.trim() ||
        !experienceDescription.trim() ||
        !experienceSectionId.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const response = yield prisma.experience.create({
            data: {
                experienceName,
                joiningDate,
                experienceDescription,
                experienceSectionId,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to Add new experience",
            });
            return;
        }
        res.status(200).json({
            message: "New experience added successfully",
            response,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});
exports.addNewExperience = addNewExperience;
