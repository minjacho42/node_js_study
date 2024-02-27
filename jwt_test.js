const dotenv = require("dotenv").config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

app.get("/jwt", (req, res)=>
{
	console.log(req)
	res.send(jwt.sign({}, secret, {
		algorithm: 'HS256',
		expiresIn: '1h'
	}))
})

