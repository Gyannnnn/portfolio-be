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
exports.signIn = exports.signUp = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = zod_1.default.object({
            userName: zod_1.default.string().min(4),
            userEmail: zod_1.default.string().email(),
            userPassword: zod_1.default
                .string()
                .min(8)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
                message: "Password must include uppercase, lowercase, number, and special character",
            }),
        });
        const results = schema.safeParse(request.body);
        if (!results.success) {
            response.status(400).json({
                message: results.error,
            });
            return;
        }
        const { userEmail, userPassword, userName } = results.data;
        const hashedUserPassword = bcryptjs_1.default.hashSync(userPassword, 10);
        const existingUser = yield prisma.user.findUnique({ where: { userEmail } });
        if (existingUser) {
            response.status(409).json({
                message: "User already exists",
            });
            return;
        }
        const newUser = yield prisma.user.create({
            data: {
                userEmail,
                userName,
                userPassword: hashedUserPassword,
            },
        });
        if (!newUser) {
            response.status(500).json({
                message: "Failed to create user",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userEmail, userName }, process.env.JWT_SECRET, {
            expiresIn: "30days",
        });
        response.status(200).json({
            message: "User Created successfully",
            newUser: newUser,
            token: token,
        });
    }
    catch (error) {
        const err = error;
        response.status(500).json({
            messsage: "Internal Server Error",
            error: err.message,
        });
    }
});
exports.signUp = signUp;
const signIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define and validate schema
        const schema = zod_1.default.object({
            userEmail: zod_1.default.string().email(),
            userPassword: zod_1.default
                .string()
                .min(8)
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
                message: "Password must include uppercase, lowercase, number, and special character",
            }),
        });
        const result = schema.safeParse(request.body);
        if (!result.success) {
            response.status(400).json({
                message: "Validation failed",
                errors: result.error
            });
            return;
        }
        const { userEmail, userPassword } = result.data;
        const existingUser = yield prisma.user.findUnique({
            where: { userEmail },
        });
        if (!existingUser) {
            response.status(404).json({
                message: "User not found",
            });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(userPassword, existingUser.userPassword);
        if (!isPasswordValid) {
            response.status(401).json({
                message: "Invalid password",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id, userEmail: existingUser.userEmail }, process.env.JWT_SECRET, { expiresIn: "30d" });
        return response.status(200).json({
            message: "Sign in successful",
            token,
            user: {
                id: existingUser.id,
                userEmail: existingUser.userEmail,
                userName: existingUser.userName,
            },
        });
    }
    catch (error) {
        const err = error;
        return response.status(500).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
});
exports.signIn = signIn;
