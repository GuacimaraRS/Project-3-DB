
const { where } = require('sequelize')
const Galery = require('../models/galery_models')
const Imagen  = require('../models/images_models')
const User = require('../models/user_models')

async function getAllImagen(req, res) {
	try {
        
		const imagen = await Imagen.findAll({where:
            req.query
        } ,{
             include: [Galery]
        })
       
		if (imagen) {
			return res.status(200).json({message: imagen})
		} else {
			return res.status(404).send('Imagen not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneImagen(req, res) {
	try {
        
		const imagen = await Imagen.findByPk(req.params.imagenId,{
            include: [Galery]
        })
       
		if (imagen) {
			return res.status(200).json({message: imagen})
		} else {
			return res.status(404).send('Imagen not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createImagen(req, res) {
    try {
        
        if (res.locals.user.role !== "client") {
            const typeCategory =req.params.galeryId
            const imagen = await Imagen.create({
                title_image: req.body.title_image,
                url:req.body.url,
                description:req.body.description,
                galeryId: typeCategory
            })
        
            if (imagen) {
                return res.status(200).json({
                    message: 'Imagen created',
                    imagen:imagen
                })
            } else
                return res.status(404).send('Imagen NO created')
        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function updateImagen(req, res) {
    try {
        if(res.locals.user.role !== "client"){ 
            const [ImagenExist] = await Imagen.update(req.body,
                {
                    where: { id: req.params.imagenId }
                })

            if (ImagenExist !== 0) {
                return res.status(200).json({ message: 'Imagen updated' })
            } else {
                return res.status(404).send('Imagen not found')
            }}else
            return res.status(404).send('User not authorization')
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deleteImagen(req, res) {
    try {

        if (res.locals.user.role !== "client") {

            const deleteImagen= await Imagen.destroy(
                {
                    where: {
                        id: req.params.imagenId
                    }
                })
            if (deleteImagen !== 0) {
                return res.status(200).json({
                    message: 'Imagen deleted',
                    deleteImagen: deleteImagen
                })
            } else
                return res.status(404).send('Imagen dont found ')


        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}


module.exports = {
   getOneImagen,
   getAllImagen,
   createImagen,
   updateImagen,
   deleteImagen
   
}