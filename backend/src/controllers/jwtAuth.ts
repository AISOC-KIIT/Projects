import { verify } from 'hono/jwt';

const jwtAuth = async(c:any,next: any)=>{

    const authHeader = c.req.header("authorization");
    console.log("auth header is: "+ authHeader);
    
  
    if( !(authHeader) || !(authHeader.startsWith('Bearer'))){
      console.log("if( !(authHeader) || !(authHeader.startsWith('Bearer')))");
      
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
        console.log("first else");
        
        c.status(403);
        return c.json({message: 'not authorized'});
      }
    } 
    catch (error) {
      console.log("last else");
      c.status(403);
      return c.json({message: 'not authorized'});
    }
  }

export default jwtAuth;