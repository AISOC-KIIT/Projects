import zod from 'zod';

const allowedPasswordCharacters = /^[!"#$%&'()*+,\-./0-9:;<=>?@A-Z[\\\]^_`a-z{|}~]+$/;

const passwordSchema = zod.string()
    .min(8,{message: "Password length must be atleast 8"})
    .max(40,{message: "Password length must be atmost 40"})
    .superRefine((val,ctx)=>{
        console.log(val);
        if(!/[A-Z]/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one uppercase letter"
            });
        }
        if(!/[a-z]/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one lowercase letter"
            });
        }
        if(!/(?=.*[0-9])|(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "There must be atleast one special character or number"
            });
        }
        if(/^$/.test(val)){
            ctx.addIssue({
                code: zod.ZodIssueCode.custom,
                message: "Enter password"
              });
        }
        else if (!allowedPasswordCharacters.test(val)) {
            ctx.addIssue({
              code: zod.ZodIssueCode.custom,
              message: "Password contains invalid characters"
            });
          }
    });

const signupSchema = zod.object({
    email: zod.string().email().max(254).min(1,{message: "Enter email"}),
    name: zod.string().min(1,{message: "Enter name"}),
    plainPassword: passwordSchema
});

const loginSchema = zod.object({
    email: zod.string().email().min(1,{message: "Enter email"}),
    plainPassword: zod.string().min(1,{message: "Enter password"})
});

const updateSchema = zod.object({
    name: zod.string().min(1,{message: "Enter name"}).optional(),
    plainPassword: passwordSchema.optional()
});


export {
    signupSchema,
    loginSchema,
    updateSchema
}