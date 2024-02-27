require("dotenv").config();
const axios = require('axios')
let express = require('express');
const { nextTick } = require("process");
let app = express();
app.listen(4242, ()=>console.log("success"));

app.use(express.json());

app.get("/auth", (req, res)=>
{
	console.log("redirect to oauth")
	res.redirect('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-d90022c7c1b8bfa4b9c369562bd2c366e5f215c6ba501b1bf8438ce3bc528e32&redirect_uri=http%3A%2F%2F13.124.198.32%3A4242%2Fcallback&response_type=code')
})

app.post("/test", (req, res) => {
	console.log(req.getReader());
	res.send("099")
})

app.get("/test", (req, res) => {
	console.log(req.headers)
	console.log(req.body)
	console.log(req.query)
	res.json({
		name: 'Jhon',
		city: 'Seoul'
	})
})
const queryParams = {
	name: 'John',
	age: 30,
	city: 'New York'
  };

app.get("/req", async (req, res) => {
	try {
		console.log(queryParams)
		const response = await axios.get('http://13.124.198.32:1234/users/test', {
			params: queryParams
		})
		console.log(response.data)
	}
	catch(error){

	}
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
		result => {
			console.log(result)
			res.redirect('http://13.124.198.32:4242/user')
		},
		error => {
			console.log(error)
			res.redirect('http://13.124.198.32:4242/auth')
		}
	)
})

app.get("/user", (req, res)=>{
	res.send("user!!")
})


const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

app.get("/jwt", (req, res)=>
{
	console.log(req)
	res.send(jwt.sign({
		id:'12345'
	}, secret, {
		algorithm: 'HS256',
		expiresIn: '1h'
	}))
})
