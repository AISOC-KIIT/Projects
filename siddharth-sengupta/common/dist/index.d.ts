import zod from 'zod';
import { signupSchema, loginSchema, updateSchema } from "./zodSchema/userSchema";
import { blogPostSchema, blogPutSchema } from "./zodSchema/blogSchema";
export type signupSchema = zod.infer<typeof signupSchema>;
export type loginSchema = zod.infer<typeof loginSchema>;
export type updateSchema = zod.infer<typeof updateSchema>;
export type blogPostSchema = zod.infer<typeof blogPostSchema>;
export type blogPutSchema = zod.infer<typeof blogPutSchema>;
