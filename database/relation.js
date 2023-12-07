//Requerir modelos 
const Event = require("../api/models/event_models")
const Message = require("../api/models/messages_models")
const Pack =require("../api/models/pack_models")
const PhotographerProfile = require("../api/models/contactInfoPhotographer_models")
const Reservation = require("../api/models/reservation_models")
const User = require("../api/models/user_models")
const Comment = require("../api/models/comments_models")
const Galery = require("../api/models/galery_models")
const Images = require("../api/models/images_models")



function addRelationsToModels() {
	try {
		//One to One
		User.hasOne(PhotographerProfile)
		PhotographerProfile.belongsTo(User)

		PhotographerProfile.hasOne(User)
		User.belongsTo(PhotographerProfile)

		//One to Many
		User.hasMany(Comment)
		Comment.belongsTo(User)

		User.hasMany(Message)
		Message.belongsTo(User)
	
		User.hasMany(Galery)
		Galery.belongsTo(User)

		User.hasMany(Reservation)
		Reservation.belongsTo(User)

		Galery.hasMany(Images)
		Images.belongsTo(Galery)

		Event.hasMany(Pack)
		Pack.belongsTo(Event)

		Pack.hasMany(Reservation)
		Reservation.belongsTo(Pack)

		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels