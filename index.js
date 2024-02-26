
require("dotenv").config();

let express = require('express');
const { nextTick } = require("process");
let app = express();
app.listen(4242, ()=>console.log("success"));
app.get("/auth", (req, res)=>
{
	console.log("redirect to oauth")
	res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d90022c7c1b8bfa4b9c369562bd2c366e5f215c6ba501b1bf8438ce3bc528e32&redirect_uri=http%3A%2F%2F13.124.198.32%3A4242%2Fcallback&response_type=code')
})

const config = {
	client: {
		id: process.env.LOGIN_42_API_UID,
		secret: process.env.LOGIN_42_API_SECRET
	},
	auth: {
		tokenHost: 'https://api.intra.42.fr'
	}
}

const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2')

app.get("/callback", (req, res)=>{
	const client = new AuthorizationCode(config);
	accessToken = client.getToken({
		code: req.query.code,
		redirect_uri: 'http://13.124.198.32:4242/callback'
	});
	accessToken.then(
		result => console.log(result),
		error => console.log(error)
	)
	res.redirect('http://13.124.198.32:4242/user')
})

app.get("/user", (req, res)=>{
	res.send("user!!")
})
