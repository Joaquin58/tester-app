import axios from 'npm:axios'

const ENDPAPI5 = 'https://api.rawg.io/api/platforms'
const API_KEY = Deno.env.get("API_KEY")

async function reducePlatfomr() {
    const { data: { next, results } } = await axios.get(`${ENDPAPI5}?key=${API_KEY}`)
    const { data: { results: platform } } = await axios.get(`${next}`)
    const page1 = results.map(({ id, name }) => {
        return {
            id,
            name
        }
    })

    const page2 = platform.map(({ id, name }) => {
        return {
            id,
            name
        }
    })
    return [...page1, ...page2]
}

export default reducePlatfomr