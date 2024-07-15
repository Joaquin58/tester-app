import * as database from '../db.js'
const { Videogame } = database.default

const destroygame = async (id) => {
    await Videogame.destroy({ where: { id } })
}

export default destroygame