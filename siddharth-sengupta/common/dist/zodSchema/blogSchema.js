"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogPutSchema = exports.blogPostSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const blogPostSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, { message: "Enter title" }),
    content: zod_1.default.string().min(1, { message: "Enter content" }),
});
exports.blogPostSchema = blogPostSchema;
const blogPutSchema = zod_1.default.object({
    title: zod_1.default.string().min(1, { message: "Enter title" }),
    content: zod_1.default.string().min(1, { message: "Enter content" }),
});
exports.blogPutSchema = blogPutSchema;
