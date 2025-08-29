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
exports.updateAbout = exports.getAboutPage = exports.createAboutpage = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const protfolioId = process.env.PF_ID;
const createAboutpage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = zod_1.default.object({
            aboutHeading: zod_1.default.string(),
            about: zod_1.default.string(),
        });
        const results = schema.safeParse(req.body);
        if (results.error) {
            res.status(400).json({
                message: results.error,
            });
            return;
        }
        const { aboutHeading, about } = results.data;
        const response = yield prisma.aboutSection.create({
            data: {
                aboutHeading,
                about,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Something went wrong",
            });
            return;
        }
        res.status(200).json({
            message: "ABout Section created successfully",
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
exports.createAboutpage = createAboutpage;
const getAboutPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const aboutPage = yield prisma.aboutSection.findFirst();
        console.log(aboutPage);
        if (!aboutPage) {
            res.status(400).json({
                message: "Something went wrong",
            });
            return;
        }
        res.status(200).json({
            message: "About page fetched succesfully",
            aboutPage,
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
exports.getAboutPage = getAboutPage;
const updateAbout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { aboutHeading, about } = req.body;
    try {
        const updateData = {};
        if (aboutHeading !== undefined)
            updateData.heading = aboutHeading;
        if (about !== undefined)
            updateData.about = about;
        if (Object.keys(updateData).length === 0) {
            res.status(400).json({
                message: "No fields to update"
            });
            return;
        }
        const response = yield prisma.aboutSection.update({
            where: {
                id: protfolioId
            },
            data: updateData
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to update aboout section"
            });
            return;
        }
        res.status(200).json({
            message: "Aboout section updated",
            response
        });
    }
    catch (error) {
        res.status(500).json({
            messaeg: "Internal server error",
            error
        });
    }
});
exports.updateAbout = updateAbout;
