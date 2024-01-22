const { Sequelize } = require('sequelize')
require('dotenv').config()



const sequelize = new Sequelize(`mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPORT}@${process.env.MYSQLPASSWORD}:${process.env.MYSQLHOST}/${process.env.MYSQL_DATABASE}`,{
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
})

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