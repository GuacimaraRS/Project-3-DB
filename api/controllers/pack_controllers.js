const Pack = require('../models/pack_models')

async function createPack(req, res) {
	try {

		if(res.locals.user.role !== "client"){ 
           const event =  req.params.eventId
        const pack = await Pack.create(req.body)
            await pack.setEvent(event)
        
            if(pack){
                return res.status(200).json({
                    message: 'Pack created',
                    pack: pack
                })
            }else
                return res.status(404).send('Pack NO created')
        }else
            return res.status(404).send('User not authorization')
	} catch (error) {
		return res.status(500).send(error.message)
    }
}

async function updatePack(req, res) {
    try {
        if (res.locals.user.role !== "client") {
            const [packExist] = await Pack.update(req.body,
                {
                    where: { id: req.params.packId }
                })

            if (packExist !== 0) {
                return res.status(200).json({ message: 'Pack updated' })
            } else {
                return res.status(404).send('Pack not found')
            }
        } else
            return res.status(404).send('User not authorization')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

async function deletePack(req, res) {
	try {

		if(res.locals.user.role !== "client"){ 
            const deletePack = await Pack.destroy(
                {
                    where: {
                        id: req.params.packId
                    }
                })
            if(deletePack !== 0){
                return res.status(200).json({
                    message: 'Pack deleted',
                    pack: deletePack
                })
            }else
                return res.status(404).send('Pack DONT found')
        }else
            return res.status(404).send('User not authorization')
	} catch (error) {
		return res.status(500).send(error.message)
    }
}


module.exports = {
    createPack,
    updatePack,
    deletePack

}