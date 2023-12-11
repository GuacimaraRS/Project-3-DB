const InfoPhotographer = require('../models/contactInfoPhotographer_models')
const User = require('../models/user_models')
const Comment = require('../models/comments_models')


async function getAllComment(req, res) {
	try {

		const comment = await Comment.findAll({
			where: {
				userId: req.params.userId
			}
		})

		if (comment) {
			const message = `The all Comment are the nexts:`

			return res.status(200).json({ message, comment })
		} else {
			return res.status(404).send('Comment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getCommentByMePhotographer(req, res) {
	try {
		const user = await User.findByPk(res.locals.user.id)
			const comment = await Comment.findAll({
				where: {
					userId: user
				}
			})	
		if (comment) {
			const message = `The all Comment are the nexts:`
			return res.status(200).json({ message, comment })

		} else {
			return res.status(404).send('Comment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createComment(req, res) {
	try {

		if (res.locals.user.role === "client") {
			const photographer = await User.findByPk(req.params.userId)
			if (photographer.role === "photographer") {
				const photographerId = req.params.userId
				const user = await User.findByPk(res.locals.user.id)
				const comment = await Comment.create({
					description: req.body.description,
					score: req.body.score,
					userId: photographerId,
					authId: user.id
				})
				if (comment) {
					return res.status(200).json({
						message: 'Comment created',
						comment: comment
					})
				}
			} else
				return res.status(404).send('Comment NO created')
		} else
			return res.status(404).send('User not authorization')
	} catch (error) {
		return res.status(500).send(error.message)
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
  
   getAllComment,
   getCommentByMePhotographer,
    createComment,
}