import {getallparallel} from '../middlewares/seccuential.js'

async function seccuential(req, res) {
    try {
        
        return res.status(200).json(await getallparallel())
    } catch (error) {
        res.status(500).json(error)
    }
}

export default seccuential