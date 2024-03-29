const { Sequelize } = require('sequelize')
require('dotenv').config()



// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,{
//     host: 'localhost',
//     dialect: 'mysql',
//     port: process.env.DB_PORT,
//     logging: false,
// })

    const sequelize = new Sequelize (`${process.env.DIALECT}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

async function checkConnection(){
    try {
        await sequelize.authenticate()
        console.log('Connection to DB has been established successfully.')
    } catch (error) {
        throw error
    }
}

async function syncModels(value) {
	const state = {
		alter: { alter: true },
		force: { force: true },
	}

	try {
		await sequelize.sync(state[value] || '')
		console.log(`All models were synchronized successfully using sync(${JSON.stringify(state[value]) || ''}).`)
	} catch (error) {
		throw error
	}
}

module.exports = { sequelize, checkConnection, syncModels }