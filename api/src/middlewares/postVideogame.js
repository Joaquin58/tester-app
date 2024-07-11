import * as tables from "../db.js"

const { Videogame } = tables.default

const postgame = async (body) => {
    const { name, description, released, rating, platforms, image } = body
    const game = await Videogame.findOrCreate({
        where: {
            name,
            description,
            released,
            rating,
            image,
            platforms
        }
    });
    return game
}

export default postgame