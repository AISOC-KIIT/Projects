import { Hono } from 'hono'
import { verify } from 'hono/jwt';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate'


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

function getCurrentDate(): string {
  const today = new Date();

  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear().toString();

  return `${day}-${month}-${year}`;
}

const jwtAuth = async(c:any,next: any)=>{

  const authHeader = c.req.header("authorization");

  if( !(authHeader) || !(authHeader.startsWith('Bearer'))){
    c.status(403);
    return c.json({ message: 'not authorized'});
  }
  const token = authHeader.split(' ')[1];

  try{
    const decoded:any = await verify(token, c.env.JWT_SECRET);
    if(decoded && decoded.id){
      c.set('userId', decoded.id);
      await next();
    } 
    else {
      c.status(403);
      return c.json({message: 'not authorized'});
    }
  } 
  catch (error) {
    c.status(403);
    return c.json({message: 'not authorized'});
  }
}


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
