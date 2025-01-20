import zod from 'zod';

const blogPostSchema = zod.object({
    title: zod.string().min(1,{message: "Enter title"}),
    content: zod.string().min(1,{message: "Enter content"}),
});

const blogPutSchema = zod.object({
    title: zod.string().min(1,{message: "Enter title"}),
    content: zod.string().min(1,{message: "Enter content"}),
});

export {
    blogPostSchema,
    blogPutSchema,
}