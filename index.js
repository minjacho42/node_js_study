import express, { application } from "express"

let app = express();
app.listen(4242, ()=>console.log("success"));
app.get("/auth", (req, res)=>
{
	res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d90022c7c1b8bfa4b9c369562bd2c366e5f215c6ba501b1bf8438ce3bc528e32&redirect_uri=http%3A%2F%2F13.124.198.32%3A4242%2Fuser&response_type=code')
})

app.get("/callback", (req, res)=>{
	res.send(req.query.code)
})

app.get("/user", (req, res)=>
{
	res.send("User index")
})
