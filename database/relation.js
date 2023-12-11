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

		Pack.hasOne(User)
		User.belongsTo(Pack)

		//One to Many
		User.hasMany(Comment)
		Comment.belongsTo(User)

		User.hasMany(Message)
		Message.belongsTo(User)
	
		User.hasMany(Galery)
		Galery.belongsTo(User)

		User.hasMany(Reservation, {foreignKey: 'clientId'})
		Reservation.belongsTo(User, {foreignKey: 'clientId'})
		
		User.hasMany(Reservation, {foreignKey: 'photographerId'})
		Reservation.belongsTo(User, {foreignKey: 'photographerId'})

		Galery.hasMany(Images)
		Images.belongsTo(Galery)

		User.hasMany(Event)
		Event.belongsTo(User)

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