const InfoPhotographer = require('../models/contactInfoPhotographer_models')
const User = require('../models/user_models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function getProfile(req, res) {
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
			return res.status(404).send('Photographer not found')
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
			const contactInfoPhoto = await InfoPhotographer.create(req.body)
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
			return res.status(404).send('Photographer not found')
		}

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteProfile(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: res.locals.user.id

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
    getProfile,
    createUser,
    updateProfile,
    deleteProfile
}