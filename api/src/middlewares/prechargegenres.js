import axios from 'npm:axios'
import * as database from "../db.js"

const ENDPAPI3 = 'https://api.rawg.io/api/genres'
const { API_KEY } = process.env

const Genre = database.default
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