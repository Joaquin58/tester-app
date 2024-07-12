
import * as env from "npm:dotenv"
import traertodoBd from '../middlewares/allgames_DB.js';
import { getByName, getByNameDb } from '../middlewares/getByName.js';
import parallel from '../middlewares/allgames_API.js';
env.config()

const allgames = async (req, res) => {
    const { name } = req.query
    try {
        if (!name) {
            const allrequestApi = parallel()
            const allrequestBd = traertodoBd()
            Promise.all([allrequestBd, allrequestApi]).then(([response1, response2]) => {
                
                return res.status(200).json([...response1,...response2])
            })

        } else {
            const resultadosApi = await getByName(name)
            const nameBd = await getByNameDb(name)
            if (!resultadosApi.length > 0 || !nameBd.length > 0) return res.status(404).send('no encontrado')
            const results = 15 - nameBd.length
            const resto = [...nameBd, ...resultadosApi.slice(0, results)]
            return res.status(200).json(resto)
        }
    } catch (error) {
        res.status(500).json('error en allgames ' + error)
    }
}

export default allgames