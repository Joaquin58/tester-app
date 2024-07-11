import database from '../db.js'
const { Videogame } = database

const destroygame = async (id) => {
    await Videogame.destroy({ where: { id } })
}

export default destroygame