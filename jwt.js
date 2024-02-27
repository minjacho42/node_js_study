const dotenv = require("dotenv").config();
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const redis = require('redis');
const secret = process.env.JWT_SECRET;
const redisClient = redis.createClient(process.env.REDIS_PORT)

module.exports = {
	sign: (user) => { // access token 발급
		const payload = {
			id: user.id,
			role: user.role
		}

		return jwt.sign(payload, secret, { // secret으로 발급
			algorithm: 'HS256',
			expiresIn: '1h'
		});
	},
	verify: (token) => { // access token 검증
		let decoded = null;
		try {
			decoded = jwt.verify(token, secret);
			return {
				ok: true,
				id: decoded.id,
				role: decoded.role
			};
		} catch (error) {
			return {
				ok: false,
				message: error.message
			};
		}
	},
	refresh: () => { // refresh token 발급
		return jwt.sign({}, secret, {
			algorithm: 'HS256',
			expiresIn: '14d',
		})
	},
	refreshVerify: async (token, userId) => { // refresh token 검증
		const getAsync = promisify(redisClient.get).bind(redisClient);

		try {
			const data = await getAsync(userId);
			if (token === data) {
				try {
					jwt.verify(token, secret);
					return true;
				} catch (err) {
					return false;
				}
			} else {
				return false;
			}
		} catch (err) {
			return false;
		}
	}
}
