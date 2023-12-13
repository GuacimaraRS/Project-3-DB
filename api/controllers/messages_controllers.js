const InfoPhotographer = require('../models/contactInfoPhotographer_models')
const User = require('../models/user_models')
const Comment = require('../models/comments_models')
const Messages = require ('../models/messages_models')


async function getAllMessages(req, res) {
	try {

		const user = await Messages.findAll({
            where:{ 
                userId: res.locals.user.id
        }})
	
		if (user) {
			const message = `The Messages are:`

			return res.status(200).json({ message, user })
		} else {
			return res.status(404).send('Comment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createMessages(req, res) {
	try {

		if (res.locals.user.role !== "photographer") {
            const user =res.locals.user.id
            const messagess = await Messages.create({
                description: req.body.description,
                authId: req.params.userId
            })
            await messagess.setUser(user)

				if (messagess) {
					return res.status(200).json({
						message: 'Message created',
						message: messagess
					})
			
			} else
				return res.status(404).send('Message NO created')
		 }else
			return res.status(404).send('User not authorization')
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function answerMessage(req, res) {
	try {
		    const messageId = req.params.messageId
            const messagess = await Messages.create({
                description: req.body.description,
                authId: req.params.userId
            })
            await messagess.setUser(user)

				if (messagess) {
					return res.status(200).json({
						message: 'Message answed',
						message: messagess
					})
			
			} else
				return res.status(404).send('Message NO created')
		
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


async function deleteMessages(req, res) {
	try {
		const message = await Messages.destroy({
            where: {
                id: req.params.messageId
            }
        });
		if(message){
			return res.status(200).send('Messages deleted')
		}else
			return res.status(404).send('Dont Found')
        
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
  
   getAllMessages,
   createMessages,
   deleteMessages
}