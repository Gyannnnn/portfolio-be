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
exports.updateIntro = exports.getIntro = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getIntro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const introduction = yield prisma.portfolio.findFirst();
        if (!introduction) {
            res.status(404).json({
                message: "introduction not found",
            });
            return;
        }
        res.status(200).json({
            message: "Successfully fetched introduction  page",
            introduction,
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
exports.getIntro = getIntro;
const updateIntro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userHeading, userBio, userResumeLink, userEmail, userGithubId } = req.body;
        const updateData = {};
        if (userHeading !== undefined)
            updateData.userHeading = userHeading;
        if (userBio !== undefined)
            updateData.userBio = userBio;
        if (userResumeLink !== undefined)
            updateData.userResumeLink = userResumeLink;
        if (userEmail !== undefined)
            updateData.userEmail = userEmail;
        if (userGithubId !== undefined)
            updateData.userGithubId = userGithubId;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No fields to update !",
            });
            return;
        }
        const updatedIntro = yield prisma.portfolio.update({
            where: {
                id: "ba63f704-9383-406a-8bc6-2868431a9c42",
            },
            data: updateData,
        });
        console.log(exports.updateIntro);
        res.status(200).json({
            message: "Portfolio updated successfully",
            updatedIntro,
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
exports.updateIntro = updateIntro;
