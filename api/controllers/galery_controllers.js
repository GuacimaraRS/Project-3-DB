
const Galery = require('../models/galery_models')
const Imagen  = require('../models/images_models')


async function getAllGalery(req, res) {
	try {
        
		const galery = await Galery.findAll({where:
            req.query
        } ,{
             include: [Imagen]
        })
       
		if (galery) {
			return res.status(200).json({message: galery})
		} else {
			return res.status(404).send('Galery not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneGalery(req, res) {
	try {
        
		const galery = await Galery.findByPk(req.params.galeryId,{
            include: [Imagen]
        })
       
		if (galery) {
			return res.status(200).json({message: galery})
		} else {
			return res.status(404).send('Galery not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createGalery(req, res) {
    try {
        
        if (res.locals.user.role !== "client") {
            const user =res.locals.user.id
            const galery = await Galery.create(req.body)
            await galery.setUser(user)

            if (galery) {
                return res.status(200).json({
                    message: 'Galery created',
                    galery: galery
                })
            } else
                return res.status(404).send('Galery NO created')
        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateGalery(req, res) {
    try {
        if(res.locals.user.role !== "client"){ 
            const [galeryExist] = await Galery.update(req.body,
                {
                    where: { id: req.params.galeryId }
                })

            if (galeryExist !== 0) {
                return res.status(200).json({ message: 'Galery updated' })
            } else {
                return res.status(404).send('Galery not found')
            }}else
            return res.status(404).send('User not authorization')
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteGalery(req, res) {
    try {

        if (res.locals.user.role !== "client") {

            const deleteGalery = await Galery.destroy(
                {
                    where: {
                        id: req.params.galeryId
                    }
                })
            if (deleteGalery !== 0) {
                return res.status(200).json({
                    message: 'Event deleted',
                    deleteGalery: deleteGalery
                })
            } else
                return res.status(404).send('Galery dont found ')


        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
    getOneGalery,
    getAllGalery,
    createGalery,
    updateGalery,
    deleteGalery
   
}