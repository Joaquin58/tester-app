import * as tables from "../db.js"
import updategame from '../middlewares/putgame.js'

const { Videogame } = tables.default


const putgame = async (req, res) => {
    const { id } = req.params
    try {
        let { genresid, ...params } = req.body

        await updategame(id, params, genresid)

        return res.status(200).json(await Videogame.findOne({
            where: { id }
        }))
    } catch (error) {
        res.status(404).json(error)
    }
}
export default putgame