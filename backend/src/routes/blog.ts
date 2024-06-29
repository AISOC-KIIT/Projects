import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'
import getCurrentDate from '../util/getDate';
import jwtAuth from '../controllers/jwtAuth';
import { blogPostSchema, blogPutSchema } from '@sid-sg/blonote-common/dist/zodSchema/blogSchema';


type envType = {
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: string
  }
}

const blogRouter = new Hono<envType>();





blogRouter
  .get('/bulk', async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
      const foundBlog = await prisma.blog.findMany({
        select:{
          title: true,
          content: true,
          publishedDate: true
        }
      });
      return c.json({foundBlog});
    }
    catch(e){
      console.log(e);
      c.status(500);
      return c.json({message: "Something wrong happened"}); 
    }
  })

  .get('/:id', async(c)=>{

    const id:number = parseInt(c.req.param('id'));
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const foundBlog = await prisma.blog.findUnique({
      where: {
        id: id
      }
    });
    if(!foundBlog){
      c.status(404);
		  return c.json({ error: "blog not found"});
    }

    const foundUser = await prisma.user.findUnique({
      where: {
        id: foundBlog.authorId
      }
    });

    return c.json({
      title: foundBlog.title,
      author: foundUser?.name,
      content: foundBlog.content,
      publishedDate: foundBlog.publishedDate
    });
  })

  .post('/', jwtAuth, async(c)=>{

    const body = await c.req.json();

    try{
      blogPostSchema.parse(body);
    }
    catch(e){
      c.status(411);
      return c.json({error: e});
    }

    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        publishedDate: getCurrentDate()
      }
    });
    return c.json(blogs);
  })

  .put('/:id',jwtAuth, async(c)=>{

    const body = await c.req.json();

    try{
      blogPutSchema.parse(body);
    }
    catch(e){
      c.status(411);
      return c.json({error: e});
    }

    const id:number = parseInt(c.req.param('id'));
    const userId:string = c.get('userId');
    
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
      const updatedBlog = await prisma.blog.update({
        where: {
          authorId: userId,
          id: id
        },
        data: {
          title: body.title,
          content: body.content
        }
      });

      return c.json({updatedBlog});

    }
    catch(e){
      c.status(500);
      return c.json({message: "Something wrong happened"});
    }
  });

export default blogRouter;
