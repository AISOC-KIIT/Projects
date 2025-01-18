"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const allowedPasswordCharacters = /^[!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_`a-z{|}~]+$/;
const passwordSchema = zod_1.default.string()
    .min(8, { message: "Password length must be atleast 8" })
    .max(40, { message: "Password length must be atmost 40" })
    .superRefine((val, ctx) => {
    console.log(val);
    if (!/[A-Z]/.test(val)) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "There must be atleast one uppercase letter"
        });
    }
    if (!/[a-z]/.test(val)) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "There must be atleast one lowercase letter"
        });
    }
    if (!/(?=.*[0-9])|(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/.test(val)) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "There must be atleast one special character or number"
        });
    }
    if (/^$/.test(val)) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "Enter password"
        });
    }
    else if (!allowedPasswordCharacters.test(val)) {
        ctx.addIssue({
            code: zod_1.default.ZodIssueCode.custom,
            message: "Password contains invalid characters"
        });
    }
});
const signupSchema = zod_1.default.object({
    email: zod_1.default.string().email().max(254).min(1, { message: "Enter email" }),
    name: zod_1.default.string().min(1, { message: "Enter name" }),
    plainPassword: passwordSchema
});
exports.signupSchema = signupSchema;
const loginSchema = zod_1.default.object({
    email: zod_1.default.string().email().min(1, { message: "Enter email" }),
    plainPassword: zod_1.default.string().min(1, { message: "Enter password" })
});
exports.loginSchema = loginSchema;
const updateSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, { message: "Enter name" }).optional(),
    plainPassword: passwordSchema.optional()
});
exports.updateSchema = updateSchema;
