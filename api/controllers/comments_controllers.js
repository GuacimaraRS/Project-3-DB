const InfoPhotographer = require('../models/contactInfoPhotographer_models')
const User = require('../models/user_models')
const Comment = require('../models/comments_models')


async function getAllComment(req, res) {
	try {

		const user = await Comment.findByPk(req.params.userId)
		const comment = await Comment.findAll({
			where:{
				userId: user.id
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
		console.log(res.locals)
		//const user = await User.findByPk(res.locals.user.id)
			const comment = await Comment.findAll({
				where: {
					userId: res.locals.user.id
				}
			})	
			console.log(comment)

			
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


async function deleteComment(req, res) {
	try {
		const user = await Comment.destroy({
            where: {
                userId: req.params.userId
            }
        });
		if(user){
			return res.status(200).send('Comment deleted')
		}else
			return res.status(404).send('Dont Found')
        
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
  
   getAllComment,
   getCommentByMePhotographer,
   createComment,
   deleteComment
}