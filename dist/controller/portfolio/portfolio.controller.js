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
exports.createPortfolio = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = zod_1.default.object({
            userName: zod_1.default.string(),
            userHeading: zod_1.default.string(),
            userBio: zod_1.default.string(),
            userResumeLink: zod_1.default.string(),
            userEmail: zod_1.default.string(),
            userGithubId: zod_1.default.string(),
            userId: zod_1.default.string(),
        });
        const results = schema.safeParse(req.body);
        if (results.error) {
            res.status(400).json({
                message: results.error,
            });
            return;
        }
        const { userName, userHeading, userBio, userResumeLink, userEmail, userGithubId, userId, } = results.data;
        const response = yield prisma.portfolio.create({
            data: {
                userName,
                userHeading,
                userBio,
                userResumeLink,
                userEmail,
                userGithubId,
                userId,
            },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to create portfolio",
            });
            return;
        }
        res.status(200).json({
            message: "Portfolio created successfully",
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
exports.createPortfolio = createPortfolio;
