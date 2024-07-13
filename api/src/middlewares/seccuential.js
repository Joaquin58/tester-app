import axios from 'npm:axios'
import reducedata from './reducedata.js'
import { config } from '../config/config.js'

const ENDPAPI1 = 'https://api.rawg.io/api/games?key='
const { API_KEY } = config.api
let pagesnums = [1, 2, 3, 4, 5]
let allgames = []

async function getGamepage(numpage) {
    const { data: { results } } = await axios.get(`${ENDPAPI1}${API_KEY}&page=${numpage}`)
    return reducedata(results)
}

async function getallparallel() {
    if (allgames.length) return allgames
    await pagesnums.reduce(async (acc, num) => {
        await acc
        const results = await getGamepage(num)
        allgames = [...allgames, ...results]
    }, Promise.resolve())

    return allgames
}
async function secforloop() {
    if (allgames.length) return allgames
    for (let nums of pagesnums) {
        const data = await getGamepage(nums)
        allgames = [...allgames, ...data]
    }
    return allgames
}

export {
    getallparallel,
    secforloop
}