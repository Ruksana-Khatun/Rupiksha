import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
 
})


app.post("/api/v1/signup",(c)=>{
   return c.text('Hello Hono!')

})

app.post("/api/v1/signin",(c)=>{
  return c.text('Hello Hono!')

})

app.post("/api/v1/blogs",(c)=>{
  return c.text('Hello Hono!')

})

app.put("/api/vi/blog;id",()=>{
    
})

app.delete("/api/v1/blog;id",()=>{
   
  
})
app.get("/api/v1/blog:id",()=>{
    

})

export default app

