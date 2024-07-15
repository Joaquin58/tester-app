import axios from 'npm:axios'
import database from "../db.js"

const ENDPAPI3 = 'https://api.rawg.io/api/genres'
const API_KEY = Deno.env.get("API_KEY")

const { Genre } = database
async function prechargeGenres() {
    try {
        const { data } = await axios.get(`${ENDPAPI3}?key=${API_KEY}`)
        data.results.map(({ id, name }) => {
            Genre.findOrCreate({
                where: { id: id, name: name }
            })
        })
    } catch (err) {
        return err
    }
}

export default prechargeGenres