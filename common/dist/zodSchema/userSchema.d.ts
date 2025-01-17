import zod from 'zod';
declare const signupSchema: zod.ZodObject<{
    email: zod.ZodString;
    name: zod.ZodString;
    plainPassword: zod.ZodEffects<zod.ZodString, string, string>;
}, "strip", zod.ZodTypeAny, {
    email: string;
    name: string;
    plainPassword: string;
}, {
    email: string;
    name: string;
    plainPassword: string;
}>;
declare const loginSchema: zod.ZodObject<{
    email: zod.ZodString;
    plainPassword: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    plainPassword: string;
}, {
    email: string;
    plainPassword: string;
}>;
declare const updateSchema: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    plainPassword: zod.ZodOptional<zod.ZodEffects<zod.ZodString, string, string>>;
}, "strip", zod.ZodTypeAny, {
    name?: string | undefined;
    plainPassword?: string | undefined;
}, {
    name?: string | undefined;
    plainPassword?: string | undefined;
}>;
export { signupSchema, loginSchema, updateSchema };
