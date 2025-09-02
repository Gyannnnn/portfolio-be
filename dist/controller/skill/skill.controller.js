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
exports.deleteSkill = exports.addNewSkill = exports.updateSkillSection = exports.createSkillSection = exports.getSkillSection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const portfolioId = process.env.PF_ID;
const getSkillSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skillSection = yield prisma.skillSection.findFirst();
        if (!skillSection) {
            res.status(400).json({
                message: "No skill section found",
            });
            return;
        }
        res.status(200).json({
            message: "Fetched skill section",
            skillSection,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});
exports.getSkillSection = getSkillSection;
const createSkillSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillHeading, skillDescription } = req.body;
    if (!skillDescription.trim() || !skillHeading.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    console.log(portfolioId);
    try {
        const response = yield prisma.skillSection.create({
            data: {
                portfolioId,
                skillHeading,
                skillDescription,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to create skill section",
            });
            return;
        }
        res.status(200).json({
            message: "Skill section created successfuly",
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
exports.createSkillSection = createSkillSection;
const updateSkillSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillHeading, skillDescription, portfolioId } = req.body;
    try {
        const updateDate = {};
        if (skillHeading !== undefined)
            updateDate.skillHeading = skillHeading;
        if (skillDescription !== undefined)
            updateDate.skillDescription = skillDescription;
        if (Object.keys(updateDate).length === 0) {
            res.status(400).json({
                message: "Nothing to update",
            });
            return;
        }
        const response = yield prisma.skillSection.update({
            where: {
                portfolioId,
            },
            data: updateDate,
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to update skill section",
            });
            return;
        }
        res.status(200).json({
            message: "Skill section updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
});
exports.updateSkillSection = updateSkillSection;
const addNewSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillIcon, skillName, skillIconColor, skillSectionId } = req.body;
    if (!skillIcon.trim() ||
        !skillName.trim() ||
        !skillIconColor.trim() ||
        !skillSectionId.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const response = yield prisma.skill.create({
            data: {
                skillIcon,
                skillName,
                skillIconColor,
                skillSectionId,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to Add new skill",
            });
            return;
        }
        res.status(200).json({
            message: "New skill added successfully",
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
exports.addNewSkill = addNewSkill;
const deleteSkill = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { skillName } = req.body();
    if (!skillName.trim()) {
        res.status(400).json({
            message: "All fields are required"
        });
        return;
    }
    try {
        const response = yield prisma.skill.delete({
            where: {
                skillName
            }
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to update"
            });
            return;
        }
        res.status(200).json({
            message: `Successfully deleted ${skillName} skill`
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
exports.deleteSkill = deleteSkill;
