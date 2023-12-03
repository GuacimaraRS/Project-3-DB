//Requerir modelos 
const User = require('../api/models/user_models')
const Image = require ('../api/models/images_models')
const Event = require ('../api/models/event_models')
const Pack = require ('../api/models/pack_models')
const Category =require ('../api/models/category_models')


function addRelationsToModels() {
	try {
		console.log('Relations added to all models')
	} catch (error) {
		throw error
	}
}

module.exports = addRelationsToModels