import * as tables from "../db.js"

const { Videogame } = tables.default
const updategame = async (id, params, genresid) => {
    try {
        await Videogame.update(params, {
            where: { id }
        })

        const updateVideogame = await Videogame.findOne({
            where: { id }
        })

        await updateVideogame.setGenres(genresid)
    } catch (error) {
        return error
    }

}

export default updategame