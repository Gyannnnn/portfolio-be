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
exports.updateLike = exports.getStats = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const protfolioId = process.env.PF_ID;
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.portfolio.findFirst({
            where: {
                id: protfolioId,
            },
            select: {
                views: true,
                likes: true,
            },
        });
        if (!data) {
            res.status(400).json({
                message: "Failed to fetch analytics",
            });
        }
        res.status(200).json({
            message: "Analytics fetched",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            messaeg: "Internal server error",
            error,
        });
    }
});
exports.getStats = getStats;
const updateLike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield prisma.portfolio.update({
            where: {
                id: protfolioId,
            },
            data: {
                likes: {
                    increment: 1,
                },
            },
        });
        res.status(200).json({
            message: "Portfolio liked successfully",
            likes: response.likes,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
});
exports.updateLike = updateLike;
