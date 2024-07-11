import database from '../db.js'

const { Videogame, Genre } = database

const getGameById = async (id) => {
    let game = await Videogame.findByPk(id, {
        include: [{
            model: Genre,
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }
        }]
    })
    return game
}
export default getGameById