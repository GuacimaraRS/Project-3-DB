const InfoPhotographer = require('../models/contactInfoPhotographer_models')
const User = require('../models/user_models')


async function getProfile(req, res) {
	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			include: 
				{
					model: User,
					model:InfoPhotographer
				},
				attributes: {
					exclude: ['password']
				}
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

async function updateProfile(req, res) {
	try {
		const user = await User.findOne({
			where: {
				id: res.locals.user.id
			},
			include: [{ model: InfoPhotographer }]
		});
		await InfoPhotographer.update(req.body,{
			where: {
				userId: user.id
			}
		});
		await User.update(req.body,{
			where: {
				id: res.locals.user.id
			}
		});

		if (user ) {
			return res.status(200).json({ message: 'Photographer updated', user: user  })
		} else {
			return res.status(404).send('Photographer not found')
		}

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteProfile(req, res) {
	try {
		const user = await User.findOne({
            where: {
                id: res.locals.user.id
            },
            include: [{ model: InfoPhotographer }]
        });
			await InfoPhotographer.destroy({
						where: {
							userId: user.id
						}
					});
        await user.destroy(); 

        return res.status(200).send('User and associated info deleted')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
    getProfile,
    updateProfile,
    deleteProfile
}