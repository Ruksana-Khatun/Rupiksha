import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono'
import { sign } from 'hono/jwt'

const app = new Hono<{
	Bindings: {
		  JWT_SECRET: string;
		DATABASE_URL: string

	}
}>();


app.get('/', (c) => {
  return c.text('Hello Hono!')
 
})


app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({ jwt });
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})


app.post('/api/v1/signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,	
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if (!user) {
		c.status(403);
		return c.json({ error: "user not found" });
	}

	const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
	return c.json({ jwt });
})


app.post("/api/v1/blogs",(c)=>{
  return c.text('Hello Hono!')

})

// app.put("/api/vi/blog;id",()=>{
    
// })

// app.delete("/api/v1/blog;id",()=>{
   
  
// })
// app.get("/api/v1/blog:id",()=>{
    

// })

export default app

