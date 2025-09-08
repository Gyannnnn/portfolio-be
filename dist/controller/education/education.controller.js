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
exports.addNewEducation = exports.updateEducationSection = exports.getEducationSection = exports.createEducationSection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const portfolioId = process.env.PF_ID;
const createEducationSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { educationHeading, educationDescription } = req.body;
    if (!educationHeading.trim() || !educationHeading.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const eduSection = yield prisma.educationSection.create({
            data: {
                educationHeading,
                educationDescription,
                portfolioId,
            },
        });
        if (!eduSection) {
            res.status(400).json({
                message: "Failed to create education section",
            });
            return;
        }
        res.status(201).json({
            message: "Education section created successfully",
            eduSection,
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
exports.createEducationSection = createEducationSection;
const getEducationSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educationSection = yield prisma.educationSection.findFirst({
            where: {
                portfolioId,
            },
            select: {
                id: true,
                educationHeading: true,
                educationDescription: true,
                portfolioId: true,
                education: true,
            },
        });
        if (!educationSection) {
            res.status(400).json({
                message: "Failed to fetch education section",
            });
            return;
        }
        res.status(200).json({
            message: "Education section fetched",
            educationSection,
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
exports.getEducationSection = getEducationSection;
const updateEducationSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { educationHeading, educationDescription, portfolioId } = req.body;
        if (!portfolioId.trim()) {
            res.status(400).json({
                message: "Portfolio id required",
            });
            return;
        }
        const updateData = {};
        if (educationHeading !== undefined || educationHeading !== "")
            updateData.educationHeading = educationHeading;
        if (educationDescription !== undefined && educationDescription !== "")
            updateData.educationDescription = educationDescription;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No fields to update !",
            });
            return;
        }
        const updatedEducationSection = yield prisma.educationSection.update({
            where: {
                portfolioId,
            },
            data: updateData,
        });
        if (!updatedEducationSection) {
            res.status(400).json({
                message: "Failed to update education section"
            });
        }
        res.status(200).json({
            message: "Education section updated successfully",
            updatedEducationSection,
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
exports.updateEducationSection = updateEducationSection;
const addNewEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { educationName, joiningDate, educationDescription, educationSectionId, } = req.body;
    if (!educationName.trim() ||
        !joiningDate.trim() ||
        !educationDescription.trim() ||
        !educationSectionId.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const response = yield prisma.education.create({
            data: {
                educationName,
                joiningDate,
                educationDescription,
                educationSectionId,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to Add new education",
            });
            return;
        }
        res.status(200).json({
            message: "New education added successfully",
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
exports.addNewEducation = addNewEducation;
