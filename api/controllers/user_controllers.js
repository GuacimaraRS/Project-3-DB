const User = require('../models/user_models')
const ContactInfoPhotographer = require ('../models/contactInfoPhotographer_models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getAllUsers(req, res) {
	try {
		const users = await User.findAll({
			where: req.query,
			attributes: {
				exclude: ['password']
			}
		})
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getAllPhotographer(req, res) {
	try {
		const users = await User.findAll({
			where: {
				role: 'photographer'
			},
			include: { model: ContactInfoPhotographer },

			attributes: {
				exclude: ['password']
			}
		})
		if (users) {
			return res.status(200).json(users)
		} else {
			return res.status(404).send('No users found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOwnProfile(req, res) {
	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			attributes: ['id','name_user','phone','email']
		})

		if (user) {
			const message = `Welcome ${user.name_user}!, this is your profile.`

			return res.status(200).json({ message, user })
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOnePhotographer(req, res) {
	try {
		const user = await User.findByPk(req.params.userId, {
			where: {
				id: res.locals.user.id, 
				role: 'photographer'
			},
			attributes: ['id','name_user','phone','email'],
			include: { model: ContactInfoPhotographer }
		})
		if (user) {
			return res.status(200).json(user)
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createUser(req, res) {
	try {
		const payload = { email: req.body.email }
		const salt = bcrypt.genSaltSync(parseInt(10))
		const encrypted = bcrypt.hashSync(req.body.password, salt)
		req.body.password = encrypted

		const user = await User.create(req.body, {
			attributes: { exclude: ['password'] }
		})


		const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })

		if (user.role === "client") {
			const users = await User.create(req.body)
			await users.setUser(user)

			return res.status(200).json({
				message: 'Client created',
				user: user,
				user: users,
				token: token
			})

		} else if (user.role === "photographer") {
			const contactInfoPhoto = await ContactInfoPhotographer.create(req.body)
			await contactInfoPhoto.setUser(user)

			return res.status(200).json({
				message: 'PhotoGrapher created',
				user: user,
				PhotoGrapherContact: contactInfoPhoto,
				token: token
			})
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateOneUser(req, res) {
	try {

		const [userExist, user] = await User.update(req.body, {
			returning: true,
			where: {
				id: req.params.userId,
				role: 'admin'
			}
		})
		if (userExist !== 0 && user.role === "admin") {
			return res.status(200).json({ message: 'User updated', user: user })
		} else if (user.role !== 'admin') {
			return res.status(401).send('User not authorized to update this user')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updateProfile(req, res) {
	try {
		const user = await User.update(req.body, {
			where: {
				id: res.locals.user.id,
			}
		})
		if (user) {
			return res.status(200).json({ message: 'User updated', user: user })
		} else {
			return res.status(404).send('User not found')
		}

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.userId,
				role: 'admin'
			},
		})
		if (user) {
			return res.status(200).send('User deleted')
		} else {
			return res.status(404).send('User not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteOwner(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.userId,
				role: 'client'
			},
		})

		if (user) {
			return res.status(200).send('User deleted')
		} else {
			return res.status(404).send('User not found or not authorized to delete this user')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


module.exports = {
	getAllUsers,
	getOwnProfile,
	getAllPhotographer,
	getOnePhotographer,
	createUser,
	updateOneUser,
	updateProfile,
	deleteUser,
	deleteOwner
}
