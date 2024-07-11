import * as database from "../db.js"
const { Genre } = database.default
import prechargeGenres from '../middlewares/prechargegenres.js'

async function chargegenres(req, res) {
    try {
        const hayalgo = await Genre.findAll()
        if (hayalgo.length === 0) {
            await prechargeGenres()
            return res.status(200).json(await Genre.findAll())
        }
        return res.status(200).json(hayalgo)
    } catch (err) {
        return res.status(500).json(err)
    }
}

export default chargegenres