import database from '../db.js'
import reducedata from './reducedata.js'

const { Videogame, Genre } = database

const traertodoBd = async () => {
    const allrequestBd = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return reducedata(allrequestBd)
}

export default traertodoBd